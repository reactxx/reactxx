import * as Ast from '../../utils/ast'
import * as Queries from '../../utils/queries';
import { cssjsToFela } from './cssjs-to-fela'
import * as Parser from '../../utils/parser';

export const transformConstStyles = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
    const stylesDecl = Queries.checkSingleResult(Ast.astq().query(root, '//VariableDeclaration/VariableDeclarator [ /Identifier [ @name == "styles"] ]'), true)
    if (!stylesDecl) return
    let objectExpr = Queries.checkSingleResult(Ast.astq().query(stylesDecl, '/ObjectExpression'), true)
    if (!objectExpr) {
        const arrowFunc = Queries.checkSingleResult(Ast.astq().query(stylesDecl, '/ArrowFunctionExpression'), true)
        if (!arrowFunc) return // e.g. Select
        objectExpr = Queries.checkSingleResult(Ast.astq().query(arrowFunc, '/ObjectExpression'), true)
        if (!objectExpr)
            objectExpr = Queries.checkSingleResult(Ast.astq().query(arrowFunc, '/BlockStatement/ReturnStatement/ObjectExpression'), true)
    }
    if (!objectExpr) return 
    cssjsToFela(objectExpr, info)
    objectExpr.properties.forEach(prop => {
        const oldValue = prop.value
        prop.value = {
            "type": "ObjectExpression",
            "properties": [
                {
                    "type": "ObjectProperty",
                    "key": {
                        "type": "Identifier",
                        "name": '$web'
                    },
                    "value": oldValue
                }
            ]
        }
    })
}