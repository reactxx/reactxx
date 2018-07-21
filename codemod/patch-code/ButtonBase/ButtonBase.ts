import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks'

export const registerButtonBase = (specials: Specials) => {
    specials['ButtonBase/Ripple'] = { transform: Tasks.taskDefaultCreator() }
    specials['ButtonBase/ButtonBase'] = { transform: Tasks.taskDefaultCreator(['ComponentProp']) }
    specials['ButtonBase/TouchRipple'] = {
        transform: (ast, info) => {
            const res = Tasks.taskDefaultCreator(['TransitionGroup'])(ast, info)
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
    }
}
