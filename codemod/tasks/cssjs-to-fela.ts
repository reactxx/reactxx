import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as warning from 'warning'
import * as Parser from '../utils/parser'

export const cssjsToFela = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  const counter = cssjsToFelaCallCounter++
  let sheet = Queries.checkSingleResult(Ast.astq().query(root, '/Program/ExportNamedDeclaration/VariableDeclaration/VariableDeclarator [ /Identifier [@name == "styles"] ]'), true)
  if (!sheet) return root
  sheet = sheet.init
  if (sheet.type !== 'ObjectExpression') {
    if (sheet.type !== 'ArrowFunctionExpression') {
      warning(false, `sheet.type !== 'ArrowFunctionExpression' at ${info.srcPath}`)
      return root
    }
    if (sheet.body && sheet.body.type === 'ObjectExpression')
      sheet = sheet.body
    else {
      sheet = Queries.checkSingleResult(Ast.astq().query(sheet, '// ReturnStatement')).argument
    }
  }
  warning(sheet.properties, `!sheet.properties at ${info.srcPath}`)
  const usedRulesetNames: Record<string, boolean> = {};
  (sheet.properties as any[]).forEach(({ value: rulesetName }) => {
    if (!rulesetName || !rulesetName.properties) {
      warning(false, `!rulesetName || !rulesetName.properties at ${info.srcPath}`)
      return
    }
    (rulesetName.properties as any[]).forEach(keyValue => {
      if (!keyValue.key) return // e.g. spread element in button.js
      switch (keyValue.key.type) {
        case 'StringLiteral':
          const newKeyValue = patchCode(keyValue.key.value, counter, usedRulesetNames)
          if (newKeyValue) {
            keyValue.key.value = keyValue.key.extra.rawValue = newKeyValue
            keyValue.key.extra.raw = `'${newKeyValue}'`
          }
          break
        case 'Identifier':
          break
        default:
          warning(false, `Wrong value type: ${keyValue.key.type} at ${info.srcPath}`)
          break
      }
      const valueCode = Parser.generateCode(keyValue.value)
      const newValueCode = patchCode(valueCode, counter, usedRulesetNames)
      if (newValueCode) {
        keyValue.value = Parser.parseExpressionLow(newValueCode)
        //warning(false, `Value code: ${valueCode}`)
      }
    })
  })
  // const code = Parser.generateCode(sheet)
  // const newCode = isFnc ?
  //   `const style = ((classSelectors = fela.getClassSelectors(['disabled'])) => theme => (${code}))()` :
  //   `const style = ((classSelectors = fela.getClassSelectors(['disabled'])) => (${code}))()`
  // const res = Parser.parseCode(newCode)
  // const dump = Parser.generateCode(res)
  return root
}
let cssjsToFelaCallCounter = 1

const patchCode = (codeStr: string, counter: number, usedRulesetNames: Record<string, boolean>) => {
  //const codeStr = Parser.generateCode(code)
  const matches = match(codeStr)
  if (matches.length === 0) return null
  let parts: string[] = [], lastIndex = 0
  matches.forEach(match => {
    if (lastIndex < match.index) parts.push(codeStr.substring(lastIndex, match.index))
    lastIndex = match.index + match.text.length + 1
    if (match.text != '') {
      usedRulesetNames[match.text] = true
      parts.push(`.${match.text}-${counter}`)
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

const res = match('asdfasdf $a1xxx asdfasdf $a2 asdasdf')

export const test = () => {
  let res

  res = Parser.generateCode(cssjsToFela(Parser.parseCode(`
export const styles = {
  root: {
    color:'red',
    '&$disabled:hover': {
      color:'red'
    }
  },
  disabled: { }
}
`)))

  res = Parser.generateCode(cssjsToFela(Parser.parseCode(`
  export const styles = theme => ({
  root: {
    color:'red',
    '&$disabled': {
      color:'red'
    }
  },
  disabled: { }
})
`)))

  res = null
}