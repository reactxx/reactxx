import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as warning from 'warning'
import * as Parser from '../utils/parser'

export const cssjsToFela = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  let sheet = Queries.checkSingleResult(Ast.astq().query(root, '/Program/ExportNamedDeclaration/VariableDeclaration/VariableDeclarator [ /Identifier [@name == "styles"] ]'), true)
  if (sheet) cssjsToFelaLow(sheet, info)
  return root
}
export const cssjsToFelaLow = (sheet: Ast.Ast, info: Ast.MUISourceInfo) => {
  const counter = cssjsToFelaCallCounter++ // unique identification of changed JS file
  // get 'const styles = ...'
  sheet = sheet.init
  // ***** get object expression
  if (sheet.type !== 'ObjectExpression') { // not object expression ...
    if (sheet.type !== 'ArrowFunctionExpression') { // ... must be arrow expression (const styles = theme => ({}))
      warning(false, `sheet.type !== 'ArrowFunctionExpression' at ${info.srcPath}`) // e.g. select.js
      return
    }
    if (sheet.body && sheet.body.type === 'ObjectExpression') // const styles = theme => ({})
      sheet = sheet.body
    else {
      sheet = Queries.checkSingleResult(Ast.astq().query(sheet, '// ReturnStatement')).argument // const styles = theme => { return {} }
    }
  }
  warning(sheet.properties, `!sheet.properties at ${info.srcPath}`)

  // ***** modify $??? part in object expression KEY and VALUE's
  const usedRulesetNames: Record<string, boolean> = {};

  (sheet.properties as any[]).forEach(({ value: rulesetName }) => { // all rulesets in sheet
    if (!rulesetName || !rulesetName.properties) {
      warning(false, `!rulesetName || !rulesetName.properties at ${info.srcPath}`)
      return
    }

    // expand comma delimited rule names (e.g. )
    const newProperties: any[] = [];
    (rulesetName.properties as any[]).forEach(keyValue => {
      if (!keyValue.key || keyValue.key.type != 'StringLiteral') {
        newProperties.push(keyValue)
        return
      }
      const parts: string[] = keyValue.key.value.split(',')
      if (parts.length < 2) {
        newProperties.push(keyValue)
        return
      }
      //delete keyValue.key.extra
      const copySrc = JSON.stringify(Ast.removeIgnored(keyValue), null, 2)
      parts.forEach(part => {
        const copy = JSON.parse(copySrc)
        copy.key.value = part.trim()
        newProperties.push(copy)
      })
    });
    rulesetName.properties = newProperties;

    // replace and register $... reference
    (rulesetName.properties as any[]).forEach(keyValue => { // all rules in ruleset
      if (!keyValue.key) return // e.g. spread element in button.js
      // *** modify KEY
      if (keyValue.key.type === 'StringLiteral') {
        const newKeyValue = patchCode(keyValue.key.value, counter, usedRulesetNames)
        if (newKeyValue) keyValue.key.value = newKeyValue
        delete keyValue.key.extra
      }
      // *** modify VALUE
      const valueCode = Parser.generateCode(keyValue.value)
      const newValueCode = patchCode(valueCode, counter, usedRulesetNames)
      if (newValueCode)
        keyValue.value = Parser.parseExpressionLow(newValueCode)
    })
  });
  // *** modify rulesets, used in $...
  (sheet.properties as any[]).forEach(({ key, value }) => { // all rulesets in sheet
    if (!key || !value)
      return
    if (!usedRulesetNames[key.name]) return
    const className = `${key.name}${counter}`
    value.properties.push(
      {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "name": `NAME$${className}`
        },
        "computed": false,
        "shorthand": false,
        "value": {
          "type": "BooleanLiteral",
          "value": true
        }
      }
    )
    return
  })

}
let cssjsToFelaCallCounter = 1

// e.g. '&$disabled:not($error)' => '&.disabled-7:not(.error-7)'
const patchCode = (codeStr: string, counter: number, usedRulesetNames: Record<string, boolean>) => {
  const matches = match(codeStr)
  if (matches.length === 0) return null
  let parts: string[] = [], lastIndex = 0
  matches.forEach(match => {
    if (lastIndex < match.index) parts.push(codeStr.substring(lastIndex, match.index))
    lastIndex = match.index + match.text.length + 1
    if (match.text != '') {
      usedRulesetNames[match.text] = true
      parts.push(`.${match.text}${counter}`)
    }
  })
  return parts.join('')
}

const match = (str: string) => {
  const matches: { index: number; text: string }[] = []
  let match = rx$whenUsed.exec(str)
  while (match != null) {
    matches.push({ index: match.index, text: match[1] });
    match = rx$whenUsed.exec(str);
  }
  if (matches.length > 0) matches.push({ index: str.length, text: '' })
  return matches
}
const rx$whenUsed = /\$(\w+)/gm

// const res = match('asdfasdf $a1xxx asdfasdf $a2 asdasdf')

// export const test = () => {
//   let res

//   res = Parser.generateCode(cssjsToFela(Parser.parseCode(`
// export const styles = {
//   root: {
//     color:'red',
//     '&$disabled:hover': {
//       color:'red'
//     }
//   },
//   disabled: { }
// }
// `)))

//   res = Parser.generateCode(cssjsToFela(Parser.parseCode(`
//   export const styles = theme => ({
//   root: {
//     color:'red',
//     '&$disabled': {
//       color:'red'
//     }
//   },
//   disabled: { }
// })
// `)))

//   res = null
// }