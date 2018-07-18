import * as warning from 'warning'
import * as Ast from './ast'
import * as Parser from './parser'
import * as Config from './config'
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

Ast.astq.func("isHTMLTag", (adapter, node, par) => {
    if (typeof par !== 'string') return
    const first = par.charAt(0)
    return first === first.toLowerCase()
})

export const getNode_importPackage = (ast: Ast.Ast, name: string, allowEmpty: boolean | null = false) => checkSingleResult (Ast.astq.query(ast, 
    `// ImportDeclaration [ /ImportDefaultSpecifier/Identifier [@name == "${name}"] ]`), allowEmpty)

export const getNode_functionGlobal = (ast: Ast.Ast, name: string, allowEmpty: boolean | null = false) => checkSingleResult (Ast.astq.query(ast, 
    `// Program/FunctionDeclaration [ /Identifier [@name == "${name}"] ]`), allowEmpty)

export const getNode_class = (ast: Ast.Ast, name: string, allowEmpty: boolean | null = false) => checkSingleResult (Ast.astq.query(ast, 
    `// Program/ClassDeclaration [ /Identifier [@name == "${name}"] ]`), allowEmpty)

export const getNode_classMethod = (ast: Ast.Ast, className: string, methodName, mode: boolean | null = false) => checkSingleResult (Ast.astq.query(ast, 
    `// Program/ClassDeclaration [ /Identifier [@name == "${className}"] ] // ClassMethod [ /Identifier [ @name == "${methodName}"] ]`), mode)

export const checkSingleResult = (res: Ast.Ast[], allowEmpty: boolean | null = false) => {
    if (allowEmpty===null) return res as any as Ast.Ast
    warning(allowEmpty===true || res.length === 1, 'checkSingle: single result expected')
    return res[0]
}

export const removeClassNamesImport = (root: Ast.Ast) => {
    Ast.removeNode(root, getNode_importPackage(root, 'classNames').$path)
}

export const adjustHtmlClassName = (root: Ast.Ast, functionName: string) => {
    const func = getNode_functionGlobal(root, functionName, false) || getNode_classMethod(root, functionName, 'render')
    const htmls = Ast.astq.query(func.body, '// JSXElement [ /JSXOpeningElement/JSXIdentifier [ isHTMLTag(@name) ] && // JSXAttribute/JSXIdentifier [ @name=="className" ] ]') as Ast.Ast[]
    const classNames = 'classNames('
    htmls.forEach(html => {
        const clasName = checkSingleResult(Ast.astq.query(html, '/JSXOpeningElement/JSXAttribute [ /JSXIdentifier [ @name=="className" ] ]'))
        const oldCode = Parser.generateCode(clasName.value.expression)
        const newCode = oldCode.startsWith(classNames) ? 'classNamesStr(' + oldCode.substr(classNames.length) : `classNamesStr(${oldCode})`
        clasName.value.expression = Parser.parseExpressionLow(newCode)
    })
    return root
}

export const selectClassNamesFromProps = (root: Ast.Ast, functionName: string) => {
    const func = getNode_functionGlobal(root, functionName, false) || getNode_classMethod(root, functionName, 'render')
    const selectProps = checkSingleResult(Ast.astq.query(func.body, '/VariableDeclaration/VariableDeclarator [ /Identifier [@name == "props"] ]'))
    const place = selectProps.id.properties;
    (place as Array<any>).splice(0, 0, selectFromObject('className'), selectFromObject('classNameStr'))
    Ast.removeIgnored(root)
    Ast.removeTemporaryFields(root)
    return root
}

const selectFromObject = (name:string) =>({
    "type": "ObjectProperty",
    "method": false,
    "key": {
      "type": "Identifier",
      "name": name
    },
    "computed": false,
    "shorthand": true,
    "value": {
      "type": "Identifier",
      "name": name
    },
    "extra": {
      "shorthand": true
    }
  })

  let res
  //res = Parser.generateCode(selectClassNamesFromProps(Parser.parseCode('function Test () { const {xxx} = props }'), 'Test'))
  //res = Parser.generateCode(selectClassNamesFromProps(Parser.parseCode('class Test { render() { const {xxx} = props } }'), 'Test'))

  //res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('function Test () { const x = <span className={classes.label}><span className={classes.label}/></span> }'), 'Test'))
  //res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('class Test { render () { const x = <span className={classes.label}><span className={classes.label}/></span> } }'), 'Test'))
  res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('class Test { render () { const x = <span className={classNames(classes.label, classes.root)}><span className={classes.label}/></span> } }'), 'Test'))

  res = null
