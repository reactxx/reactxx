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

export const getNode_importPackage = (ast: Ast.Ast, name: string) => Ast.astq.query(ast, `// ImportDeclaration [ /ImportDefaultSpecifier/Identifier [@name == "${name}"] ]`)

export const getNode_functionGlobal = (ast: Ast.Ast, name: string) => Ast.astq.query(ast, `// Program/FunctionDeclaration [ /Identifier [@name == "${name}"] ]`)

export const getNode_class = (ast: Ast.Ast, name: string) => Ast.astq.query(ast, `// Program/ClassDeclaration [ /Identifier [@name == "${name}"] ]`)

export const getNode_classMethod = (ast: Ast.Ast, className: string, methodName) => { 
    return Ast.astq.query(checkSingleResult(getNode_class (ast,className)), `// ClassMethod/Identifier [ @name == "${methodName}"]`)
}

export const checkSingleResult = (res: Ast.Ast[]) => {
    warning(res && res.length === 1, 'checkSingle: single result expected')
    return res[0]
}

export const removeClassNamesImport = (root: Ast.Ast) => {
    Ast.removeNode(root, checkSingleResult(getNode_importPackage(root, 'classNames')).$path)
}

export const adjustHtmlClassName = (root: Ast.Ast, functionName: string) => {
    const func = checkSingleResult(getNode_functionGlobal(root, functionName))
    const htmls = Ast.astq.query(func, '/BlockStatement // JSXElement [ /JSXOpeningElement/JSXIdentifier [ isHTMLTag(@name) ] && // JSXAttribute/JSXIdentifier [ @name=="className" ] ]') as Ast.Ast[]
    htmls.forEach(html => {
        const clasName = checkSingleResult(Ast.astq.query(html, '// JSXAttribute [ /JSXIdentifier [ @name=="className" ] ]'))
        const oldCode = Parser.generateCode(clasName.value.expression)
        clasName.value.expression = Ast.removeIgnored (Parser.parseExpressionLow(`classNamesStr(${oldCode.code})`))
    })
    const res = Parser.generateCode (root)
    return null
}

export const selectClassNamesFromProps = (root: Ast.Ast, functionName: string) => {
    let func = getNode_functionGlobal(root, functionName)
    if (!func || func.length!=1) func = checkSingleResult(getNode_classMethod(root, functionName, 'render'))
    const selectProps = Ast.astq.query(func, '/BlockStatement/VariableDeclaration/VariableDeclarator [ /Identifier [@name == "props"] ]')
    const place = selectProps[0].id.properties;
    (place as Array<any>).splice(0, 0, JSON.parse(`
    {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "name": "classNames"
        },
        "computed": false,
        "shorthand": true,
        "value": {
          "type": "Identifier",
          "name": "classNames"
        },
        "trailingComments": [
          {
            "type": "CommentBlock",
            "value": "*** REACTXX PATCH: selectClassNamesFromProps"
          }
        ]  
      }
    `))
}

let res = getNode_classMethod(Parser.parseCode('class Test { render() { const {classNames} = props } }'), 'Test', 'render')

res = null

