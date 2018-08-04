import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks'

export const registerInputLabel = (specials: Specials) => {
    specials['InputLabel/InputLabel'] = {
        transform: (ast, info) => {
            const res = Tasks.withStylesTaskDefaultCreator()(ast, info)
            // swap shrink and margin order in classNames call as follows:
            // const className = classNames(
            //     ...
            //     margin === "dense" && classes.marginDense,
            //     shrink && classes.shrink,
            //     ...
            //   );            
            const callExpression = Queries.checkSingleResult(Ast.astq().query(res,`// CallExpression [ /Identifier [@name == "classNames"] && // LogicalExpression/Identifier [ @name == "shrink"] ]`))
            const shrink = Queries.checkSingleResult(Ast.astq().query(callExpression,`// LogicalExpression [ /Identifier [ @name == "shrink"] ]`))
            const margin = Queries.checkSingleResult(Ast.astq().query(callExpression,`// LogicalExpression [/BinaryExpression/Identifier [ @name == "margin"] ]`))
            const shrinkIdx = (callExpression.arguments as any[]).indexOf(shrink)
            const marginIdx = (callExpression.arguments as any[]).indexOf(margin)
            callExpression.arguments[shrinkIdx] = margin
            callExpression.arguments[marginIdx] = shrink
            return res
        }
    }
}
