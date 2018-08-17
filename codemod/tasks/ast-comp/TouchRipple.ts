import * as Ast from '../../utils/ast'
import * as Tasks from '../default-modifier'
import * as Queries from '../../utils/queries'

export const touchRippleAst = (ast: Ast.Ast, info: Ast.MUISourceInfo) => {
    const res = Tasks.withStylesTaskDefaultCreator()(ast, info)
    const rippleAttrs = Queries.checkSingleResult(Ast.astq().query(res, `// JSXOpeningElement [ /JSXIdentifier [@name == "Ripple"] ]`))
    rippleAttrs.attributes.push({
        "type": "JSXAttribute",
        "name": {
            "type": "JSXIdentifier",
            "name": "$system"
        },
        "value": {
            "type": "JSXExpressionContainer",
            "expression": {
                "type": "MemberExpression",
                "object": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "ThisExpression",
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "props"
                    },
                    "computed": false
                },
                "property": {
                    "type": "Identifier",
                    "name": "$system"
                },
                "computed": false
            }
        }
    })
    return res
}
