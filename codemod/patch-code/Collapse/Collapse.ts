import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks'

export const registerCollapse = (specials: Specials) => {
    specials['Collapse/Collapse'] = {
        transform: (ast, info) => {
            const res = Tasks.withStylesTaskDefaultCreator()(ast, Object.assign({}, info, {
                adjustThemeProperties: ['handleEntering', 'handleExiting'],
            }));
            // ['moveTabsScroll', 'scrollSelectedIntoView', 'getConditionalElements', 'updateScrollButtonState', 'updateIndicatorState'].forEach(methodName => {
            //     const method = Queries.checkSingleResult(
            //         methodName === 'updateIndicatorState' 
            //         ? Ast.astq().query(res,`// Program/ClassDeclaration [ /Identifier [@name == "${info.name}"] ] // ClassMethod [ /Identifier [ @name == "${methodName}"] ]`)
            //         : Ast.astq().query(res,`// Program/ClassDeclaration [ /Identifier [@name == "${info.name}"] ] // ClassProperty [ /Identifier [ @name == "${methodName}"] ] / ArrowFunctionExpression`))
            //     const selectProps = Queries.checkSingleResult(Ast.astq().query(method.body, '/VariableDeclaration/VariableDeclarator [ // Identifier [@name == "props"] ]'))
            //     const place: any[] = selectProps.id.properties;
            //     const themeIdx = place.findIndex(pl => pl.key && pl.key.name === 'theme');
            //     if (themeIdx >= 0)
            //       place.splice(themeIdx, 1);
            //     (place as Array<any>).splice(0, 0, constSelectTheme)
            // })
            return res
        }
    }
}
