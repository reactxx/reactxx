import * as Queries from '../queries'
import * as Ast from '../ast'
import * as Parser from '../parser'

Ast.astq.func("isHTMLTag", (adapter, node, tagName, tagNames) => {
  if (typeof tagName !== 'string') return false
  const first = tagName[0].charAt(0)
  if (first === first.toLowerCase()) return true
  if (!Array.isArray(tagNames)) return false
  return !!tagNames.find(name => name === tagName)
})

export const taskDefaultCreator = (functionName: string, forceHTMLTags?: string[]) => (root: Ast.Ast) => {
  removeClassNamesImport(root)
  selectClassNamesFromProps(root, functionName)
  refactorClassNames(root)
  adjustHtmlClassName(root, functionName, forceHTMLTags)
}

const removeClassNamesImport = (root: Ast.Ast) => {
  Ast.removeNode(root, Queries.getNode_importPackage(root, 'classNames').$path)
}

const getRenderFunc = (root: Ast.Ast, functionName: string) => {
  return Queries.getNode_functionGlobal(root, functionName, true) || Queries.getNode_classMethod(root, functionName, 'render')
}

const adjustHtmlClassName = (root: Ast.Ast, functionName: string, forceHTMLTags: string[]) => {
  const func = getRenderFunc(root, functionName)
  const htmls = Ast.astq.query(func.body, '// JSXElement [ /JSXOpeningElement/JSXIdentifier [ isHTMLTag(@name, {forceHTMLTags}) ] && // JSXAttribute/JSXIdentifier [ @name=="className" ] ]', { forceHTMLTags: forceHTMLTags || null }) as Ast.Ast[]
  const classNames = 'classNames('
  htmls.forEach(html => {
    const clasName = Queries.checkSingleResult(Ast.astq.query(html, '/JSXOpeningElement/JSXAttribute [ /JSXIdentifier [ @name=="className" ] ]'))
    const oldCode = Parser.generateCode(clasName.value.expression)
    const newCode = oldCode.startsWith(classNames) ? 'classNamesStr(' + oldCode.substr(classNames.length) : `classNamesStr(${oldCode})`
    clasName.value.expression = Parser.parseExpressionLow(newCode)
  })
  return root
}

const refactorClassNames = (root: Ast.Ast) => {
  const calls = Ast.astq.query(root, `// CallExpression [ /Identifier [@name == "classNames"] && /ObjectExpression ]`)
  calls.forEach(call => {
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


const selectClassNamesFromProps = (root: Ast.Ast, functionName: string) => {
  const func = getRenderFunc(root, functionName)
  const selectProps = Queries.checkSingleResult(Ast.astq.query(func.body, '/VariableDeclaration/VariableDeclarator [ // Identifier [@name == "props"] ]'))
  const place = selectProps.id.properties;
  (place as Array<any>).splice(0, 0, selectFromObject)
  Ast.removeIgnored(root)
  Ast.removeTemporaryFields(root)
  return root
}

/* 
$system: {
    classNames,
    classNamesStr
}
*/
const selectFromObject = {
  "type": "ObjectProperty",
  "method": false,
  "key": {
    "type": "Identifier",
    "name": "$system"
  },
  "computed": false,
  "shorthand": false,
  "value": {
    "type": "ObjectPattern",
    "properties": [
      {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "start": 39,
          "name": "classNames"
        },
        "computed": false,
        "shorthand": true,
        "value": {
          "type": "Identifier",
          "name": "classNames"
        },
        "extra": {
          "shorthand": true
        }
      },
      {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "name": "classNamesStr"
        },
        "computed": false,
        "shorthand": true,
        "value": {
          "type": "Identifier",
          "name": "classNamesStr"
        },
        "extra": {
          "shorthand": true
        }
      }
    ]
  }
}

let res
//res = Parser.generateCode(selectClassNamesFromProps(Parser.parseCode('function Test () { const {xxx} = props }'), 'Test'))
//res = Parser.generateCode(selectClassNamesFromProps(Parser.parseCode('class Test { render() { const {xxx} = props } }'), 'Test'))

//res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('function Test () { const x = <span className={classes.label}><span className={classes.label}/></span> }'), 'Test'))
//res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('class Test { render () { const x = <span className={classes.label}><span className={classes.label}/></span> } }'), 'Test'))
//res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('class Test { render () { const x = <span className={classNames(classes.label, classes.root)}><span className={classes.label}/></span> } }'), 'Test'))

// res = Parser.generateCode(refactorClassNames(Parser.parseCode('classNames( xx, { [classes.label + "xxx"]: a || b }, yy)')))
// res = null
