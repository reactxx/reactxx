import * as warning from 'warning'
import * as Ast from './ast'

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

