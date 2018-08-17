import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'
import * as Parser from '../../utils/parser'

// refactor all calls of 'classNames' in render function: its ObjectExpression attribute, e.g. 'classNames(...,{x:y},...)' replace by 'classNames(...,(y) && (x),...)'
export const refactorClassNamesConditions = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
    const calls = Ast.astq().query(root, `// CallExpression [ /Identifier [@name == "classNames"] && /ObjectExpression ]`)
    calls.forEach(call => {
      // check, if every 'classNames(classes.root ??? ' ends with ' ???, classNameProp)'
      if (call.arguments.length >= 2) {
        const first = Parser.generateCode(call.arguments[0])
        const last = Parser.generateCode(call.arguments[call.arguments.length - 1])
        if (first === 'classes.root' && (last != 'classNameProp' && last != 'className')) {
          // for Modal.js and StepIcon.js
          const x = 0
        }
      }
      // refactor
      const newArguments = []
      call.arguments.forEach(arg => {
        if (arg.type != 'ObjectExpression') { newArguments.push(arg); return }
        arg.properties.forEach(prop => {
          const left = Parser.generateCode(prop.key)
          const right = Parser.generateCode(prop.value)
          newArguments.push(Parser.parseExpressionLow(`(${right}) && (${left})`))
        })
      })
      call.arguments = newArguments
    })
    return root
  }
  