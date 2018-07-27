import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'

export const cssjsToFela = (root: Ast.Ast) => {
  let style = Ast.astq().query(root, '/Program/VariableDeclaration/VariableDeclarator [ /Identifier [@name == "style"] ]')[0].init
  const isFnc = style.type === 'ArrowFunctionExpression'
  if (isFnc) style = style.body;
  (style.properties as any[]).forEach(({ key, value }) => {
    const keyCode = Parser.generateCode(key)
    const valueCode = Parser.generateCode(value)
  })
  const code = Parser.generateCode(style)
  const newCode = isFnc ? `const style = ((classSelectors = fela.getClassSelectors(['disabled'])) => theme => (${code}))()` : `const style = ((classSelectors = fela.getClassSelectors(['disabled'])) => (${code}))()`
  const res = Parser.parseCode(newCode)
  const dump = Parser.generateCode(res)
  return res
}

const match = (str: string) => {
  const matches = []
  let match = rx$whenUsed.exec(str)
  while (match != null) {
    matches.push({index: match.index, text:match[1]});
    match = rx$whenUsed.exec(str);
  }
  return matches
}
const rx$whenUsed = /\$(\w+)/gm

const res = match('asdfasdf $a1xxx asdfasdf $a2 asdasdf')

export const test = () => {
  let res

  res = Parser.generateCode(cssjsToFela(Parser.parseCode(`
const style = {
  root: {
    '&$disabled': {
      color:'red'
    }
  },
  disabled: { }
}
`)))

  res = Parser.generateCode(cssjsToFela(Parser.parseCode(`
const style = theme => ({
  root: {
    '&$disabled': {
      color:'red'
    }
  },
  disabled: { }
})
`)))

  res = null
}