import * as Ast from '../../utils/ast'
import * as Tasks from '../../utils/tasks/default'
import * as Queries from '../../utils/queries'

export default [
    {
        path: 'ButtonBase/ButtonBase',
        transform: Tasks.taskDefaultCreator('ButtonBase', ['ComponentProp'])
    },
    {
        path: 'ButtonBase/TouchRipple',
        transform: ast => {
            const res = Tasks.taskDefaultCreator('TouchRipple', ['TransitionGroup'])(ast)
            //const rippleAttrs = Ast.astq.query(res, `// JSXOpeningElement`)
            const rippleAttrs = Queries.checkSingleResult(Ast.astq.query(res, `// JSXOpeningElement [ /JSXIdentifier [@name == "Ripple"] ]`))
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
    },
    {
        path: 'ButtonBase/Ripple',
        transform: Tasks.taskDefaultCreator('Ripple')
    },
] as Ast.FileDescr[]