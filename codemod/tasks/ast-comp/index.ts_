import * as Ast from '../../utils/ast'
import * as Tasks from '../default-modifier'
import * as Parser from '../../utils/parser'
import * as Queries from '../../utils/queries'
import { gridAst } from './Grid'
import { touchRippleAst } from './TouchRipple'

export const transformAstCode = (ast: Ast.Ast, info: Ast.MUISourceInfo) => {
    switch (info.path) {
        case 'ButtonBase/Ripple':
            Tasks.withStylesTaskDefaultCreator()(ast, info)
            break
        case 'ButtonBase/TouchRipple':
            touchRippleAst(ast, info)
            break
        case 'Collapse/Collapse':
            Tasks.withStylesTaskDefaultCreator()(ast, Object.assign({}, info, {
                adjustThemeProperties: ['handleEntering', 'handleExiting'],
            } as Ast.MUISourceInfo));
            break
        case 'Grid/Grid':
            gridAst(ast, info)
            break
        case 'Input/Input':
            const body = info.renderFunc.body.body as any[];
            const returnIdx = body.findIndex(node => node.type === 'ReturnStatement')
            body.splice(returnIdx, 0, Parser.parseCode("if (typeof InputComponent !== 'string') inputProps.$system = this.props.$system;"))
            Tasks.withStylesTaskDefaultCreator()(ast, info)
            break
        case 'InputLabel/InputLabel':
            Tasks.withStylesTaskDefaultCreator()(ast, info)
            // swap shrink and margin order in classNames call as follows:
            // const className = classNames(
            //     ...
            //     margin === "dense" && classes.marginDense,
            //     shrink && classes.shrink,
            //     ...
            //   );            
            const callExpression = Queries.checkSingleResult(Ast.astq().query(ast, `// CallExpression [ /Identifier [@name == "classNames"] && // LogicalExpression/Identifier [ @name == "shrink"] ]`))
            const shrink = Queries.checkSingleResult(Ast.astq().query(callExpression, `// LogicalExpression [ /Identifier [ @name == "shrink"] ]`))
            const margin = Queries.checkSingleResult(Ast.astq().query(callExpression, `// LogicalExpression [/BinaryExpression/Identifier [ @name == "margin"] ]`))
            const shrinkIdx = (callExpression.arguments as any[]).indexOf(shrink)
            const marginIdx = (callExpression.arguments as any[]).indexOf(margin)
            callExpression.arguments[shrinkIdx] = margin
            callExpression.arguments[marginIdx] = shrink
            break
        case 'NativeSelect/NativeSelectInput':
            Tasks.classNamesFix()(ast, info)
            break
        case 'Select/SelectInput':
            Tasks.classNamesFix()(ast, info)
            break
        case 'Tabs/Tabs':
            Tasks.withStylesTaskDefaultCreator()(ast, Object.assign({}, info, {
                adjustThemeProperties: ['moveTabsScroll', 'scrollSelectedIntoView', 'getConditionalElements', 'updateScrollButtonState'],
                adjustThemeMethods: ['updateIndicatorState']
            } as Ast.MUISourceInfo))
            break
        default:
            if (info.withStyles) Tasks.withStylesTaskDefaultCreator()(ast, info)
            else if (info.withTheme) Tasks.withThemeTaskDefaultCreator()(ast, info)
            else Tasks.otherTaskDefaultCreator()(ast, info)
            break
    }
}