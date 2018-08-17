import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'
import * as Parser from '../../utils/parser'

export const adjustPaddingMargins = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
    const margin = adjustPaddingMarginsLow(root, 'margin')
    const padding = adjustPaddingMarginsLow(root, 'padding')
    if (margin || padding)
      addToAtomicImport(root)
  }
  // replace single margin's and padding's with toAtomic() spread
  const adjustPaddingMarginsLow = (root: Ast.Ast, marginPadding: 'padding' | 'margin') => {
    let modified = false
    const styles = Queries.checkSingleResult(Ast.astq().query(root, '/Program/ExportNamedDeclaration/VariableDeclaration/VariableDeclarator [ /Identifier [@name=="styles"] ] //ObjectExpression '), true)
    if (!styles) return
    const rulesets: any[] = Ast.astq().query(styles, `// ObjectExpression [ /ObjectProperty [ /Identifier [ @name=="${marginPadding}" ] ] ]`)
    if (rulesets.length === 0) return
    rulesets.forEach(({ properties }) => {
      const parsed: any[] = properties.map(obj => parseValue(marginPadding, obj.key && obj.key.name === marginPadding && obj.value))
      // process in reverse order
      parsed.reverse().forEach((newValue, idx) => {
        if (!newValue) return
        modified = true
        // replace single margin with spread operator
        properties.splice(parsed.length - idx - 1, 1)
        properties.splice(0, 0, newValue)
      })
    })
    //const dev = Parser.generateCode(styles)
    return modified
  }
  const addToAtomicImport = (root: Ast.Ast) => {
    const body = Queries.checkSingleResult(Ast.astq().query(root, `// Program`)).body as any[];
    const idx = body.findIndex(imp => imp.type === 'ImportDeclaration')
    body.splice(idx + 1, 0, Parser.parseCode(`import { toAtomic } from '../styles/withStyles';`))
  }
  const parseValue = (prefix: string, value) => {
    if (!value) return null
    return {
      "type": "SpreadElement",
      "argument": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "toAtomic"
        },
        "arguments": [
          {
            "type": "StringLiteral",
            "extra": {
              "rawValue": prefix,
              "raw": `'${prefix}'`
            },
            "value": prefix
          },
          value
        ]
      }
    }
  }