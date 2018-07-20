import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'

export const taskDefaultCreator = (functionName: string, forceHTMLTags?: string[]) => (root: Ast.Ast) => {
  removeClassNamesImport(root)
  selectClassNamesFromProps(root, functionName)
  refactorClassNames(root)
  adjustHtmlClassName(root, functionName, forceHTMLTags)
  propTypesAndDefaultProps(root, functionName)
  return root
}

const removeClassNamesImport = (root: Ast.Ast) => {
  const classNames = Queries.getNode_importPackage(root, 'classNames', true)
  if (!classNames) return
  Ast.removeNode(root, classNames.$path)
}

const getRenderFunc = (root: Ast.Ast, functionName: string) => {
  return Queries.getNode_functionGlobal(root, functionName, true) || Queries.getNode_classMethod(root, functionName, 'render')
}

const adjustHtmlClassName = (root: Ast.Ast, functionName: string, forceHTMLTags: string[]) => {
  const func = getRenderFunc(root, functionName)
  const htmls = Ast.astq().query(func.body, '// JSXElement [ /JSXOpeningElement/JSXIdentifier [ isHTMLTag(@name, {forceHTMLTags}) ] && // JSXAttribute/JSXIdentifier [ @name=="className" ] ]', { forceHTMLTags: forceHTMLTags || null }) as Ast.Ast[]
  const classNames = 'classNames('
  htmls.forEach(html => {
    const clasName = Queries.checkSingleResult(Ast.astq().query(html, '/JSXOpeningElement/JSXAttribute [ /JSXIdentifier [ @name=="className" ] ]'))
    const oldCode = Parser.generateCode(clasName.value.expression)
    const newCode = oldCode.startsWith(classNames) ? 'classNamesStr(' + oldCode.substr(classNames.length) : `classNamesStr(${oldCode})`
    clasName.value.expression = Parser.parseExpressionLow(newCode)
  })
  return root
}

const refactorClassNames = (root: Ast.Ast) => {
  const calls = Ast.astq().query(root, `// CallExpression [ /Identifier [@name == "classNames"] && /ObjectExpression ]`)
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
  const all = Ast.astq().query(func.body, '/VariableDeclaration/VariableDeclarator [ // Identifier [@name == "props"] ]')
  const selectProps = all && all.length > 0 ? all[0] : null
  const place = selectProps.id.properties;
  (place as Array<any>).splice(0, 0, selectFromObject)
  Ast.removeIgnored(root)
  Ast.removeTemporaryFields(root)
  return root
}

const propTypesAndDefaultProps = (root: Ast.Ast, name: string) => {
  const program = Queries.checkSingleResult(Ast.astq().query(root, `/Program`))
  const getStaticProp = (propName: string) => Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExpressionStatement [/AssignmentExpression/MemberExpression [ /Identifier [ @name=="${name}"] && /Identifier [ @name=="${propName}"] ] ]`), true)
  // remove propTypes
  const propTypes = getStaticProp('propTypes');
  if (propTypes) {
    const propTypesIdx = program.body.indexOf(propTypes);
    (program.body as any[]).splice(propTypesIdx, 1)
  }
  // remove defaultProps
  const defaultProps = getStaticProp('defaultProps')
  if (defaultProps) {
    const defaultPropsIdx = program.body.indexOf(defaultProps);
    (program.body as any[]).splice(defaultPropsIdx, 1)
    // put defaultProps to withStyles
    const withStyles = Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExportDefaultDeclaration/CallExpression/CallExpression [ /Identifier [ @name=="withStyles" ] ] /ObjectExpression`))
    withStyles.properties.push({
      "type": "ObjectProperty",
      "method": false,
      "key": {
        "type": "Identifier",
        "name": "defaultProps"
      },
      "computed": false,
      "shorthand": false,
      "value": defaultProps.expression.right
    })
  }
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

//res = Parser.generateCode(refactorClassNames(Parser.parseCode('classNames( xx, { [classes.label + "xxx"]: a || b }, yy)')))

// res = Parser.generateCode(propTypesAndDefaultProps(Parser.parseCode(`
// Button.propTypes = {
// };
// Button.defaultProps = {
//     x:0
// };
// export default withStyles(styles, {
//   name: 'MuiButton'
// })(Button);
// `), 'Button'))

res = null
