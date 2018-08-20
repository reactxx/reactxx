import { replaceAll } from '../utils/regexp'
import * as Config from '../utils/config'

import * as Ast from '../utils/ast'
import * as Tasks from './ast/default-modifier'
import * as Parser from '../utils/parser'
import * as Queries from '../utils/queries'
import { gridAst } from './ast-comp/Grid'
import { touchRippleAst } from './ast-comp/TouchRipple'


export const transform = (code: string, info: Ast.MUISourceInfo, dts: string) => {

    console.log(info.path)

    //********** STRING REPLACE
    switch (info.path) {
        case 'GridListTile/GridListTile':
            code = code.replace(`\nimport`, `\nimport {fitPatch} from './GridListTilePatch';\nimport`)
            code = code.replace(`fit = () => {`, `  fit = fitPatch.bind(this)\n  fit_ = () => {`)
            break
        case 'SwipeableDrawer/SwipeArea':
            code += `\nexport interface SwipeAreaProps {}\n`
            break
        case '':
            code = code.replace(``, ``)
            break
        case '':
            code = code.replace(``, ``)
            break
        case '':
            code = code.replace(``, ``)
            break
        case '':
            code = code.replace(``, ``)
            break
        case '':
            code = code.replace(``, ``)
            break
        case '':
            code = code.replace(``, ``)
            break
        case 'Tooltip/Tooltip':
            code = code.replace(`=== 'button'`, `=== 'button' as any`)
            code = code.replace(`this.state.open = false`, `(this.state.open as any) = false`)
            code = code.replace(`const childrenProps = {`, `const childrenProps: any = {`)
            code = code.replace(`this.props.theme`, `this.props.$system.theme`)
            code = code.replace(`className={classes.popper}`, `className={classes.popper as any}`)
            code = code.replace(`rootRef={this.onRootRef}`, `{...{rootRef:this.onRootRef}}`)
            break
        case 'Zoom/Zoom':
            code = code.replace(`children.props.style`, `(children.props as any).style`)
            code = code.replace(`React.cloneElement(children`, `React.cloneElement(children as any`)
            code = code.replace(`this.props.onEnter(node)`, `(this.props as any).onEnter(node)`)
            // Error in C:\reactxx\codemod\patch-original\transitions\transition.d.ts
            code = code.replace(`onExit={this.handleExit}`, `onExit={this.handleExit}\ntimeout = {null}`)
            break
        case 'withWidth/withWidth':
            code = code.replace(`const more = {};`, `const more: any = {};`)
            break
        case 'styles/withTheme':
            code = code.replace(`return WithTheme;`, `return WithTheme as React.ComponentClass<any>;`)
            break
        case 'styles/withStyles':
            code = code.replace(`return WithStyles;`, `return WithStyles as React.ComponentClass<any>;`)
            code = code.replace(`extends React.Component {`, `extends React.Component {\n cacheClasses`)
            code = code.replace(`const stylesCreator = getStylesCreator`, `const stylesCreator: any = getStylesCreator`)
            break
        case 'withMobileDialog/withMobileDialog':
            code = code.replace(`WithMobileDialog.propTypes = {`, `(WithMobileDialog as any).propTypes = {`)
            code = code.replace(`from '../withWidth';`, `from '../withWidth/withWidth';`)
            break
        case 'styles/createPalette':
            code = code.replace(`mainShade = 500`, `mainShade: any = 500`).replace(`lightShade = 300`, `lightShade: any = 300`).replace(`darkShade = 700`, `darkShade: any = 700`)
            break
        case 'styles/createGenerateClassName':
            code = replaceAll(code, `global.__MUI_GENERATOR_COUNTER__`, `global['__MUI_GENERATOR_COUNTER__']`)
            break
        case 'internal/animate':
            code = code.replace(`cb = ()`, `cb: any = ()`)
            break
        case 'ButtonBase/focusVisible':
            code = code.replace(`const internal = {`, `const internal: any = {`)
            break
    }

    code = code.replace(/options\s*=\s*{}/, `options: any = {}`)
    code = code.replace(`import classNames from 'classnames';`, `import { classNames } from 'reactxx-basic';`)
    const compProps = info.withStylesOrTheme ? 'Partial<Types.CodeProps<Shape>>' : '{children, [p:string]: any}'
    code = code.replace(`extends React.Component {`, `extends React.Component<${compProps},any> {\n static propTypes\n  static displayName\n static contextTypes\n static Naked\n  static options`)
    code = code.replace(`  state = {};`, `  state: any = {};`)
    code = code.replace(`super();`, `super(props);`)
    code = code.replace(`import withTheme from '../styles/withTheme';`, ``)
    code = code.replace(`import withStyles from '../styles/withStyles';`, ``)
    code = code.replace(`export const styles =`, `const styles =`)
    code = code.replace(`import PropTypes from 'prop-types';`, ``)
    code = code.replace(``, ``)

    //********** INCLUDE TYPESCRIPT DEFINITIONS
    if (dts) {
        dts = dts.replace(/\ninterface /g, '\nexport interface ')
        dts = dts.replace(`import * as React from 'react';`, '')
        dts = dts.replace(/\ntype /g, '\nexport type ')
        dts = dts.replace(`import { Theme } from '../styles/createMuiTheme';`, ``)
        const ast = Parser.parseCode(dts)
        //if (info.path === 'styles/index') debugger
        ast.program.body = (ast.program.body as any[]).filter(node =>
            node.type === 'ImportDeclaration' ||
            (node.declaration && (
                node.declaration.type === 'TSInterfaceDeclaration' ||
                node.declaration.type === 'TSTypeAliasDeclaration'
            ))

        )
        let dtsCode = Parser.generateCode(ast)
        if (dtsCode.length > 0)
            code = insertAfterImports(code, dtsCode)

    }

    //********** AFTER INSERTING TS DEFS
    switch (info.path) {
        case 'styles/index':
            code = code.replace(`export { default as MuiThemeProvider } from './MuiThemeProvider';`, ``)
            code += `\nexport { StyledComponentProps, StyleRules } from "./withStyles";`
            break
    }

    //**********AST MODIFICATION
    const ast = Parser.parseCode(code)
    // finish logItem
    info.renderFunc = Queries.getNode_functionGlobal(ast, info.name, true)
    if (!info.renderFunc) {
        info.renderFunc = Queries.getNode_classMethod(ast, info.name, 'render', true)
        if (info.renderFunc)
            info.isClass = true
    }
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
        case 'TextField/TextField':
            Tasks.withStylesTaskDefaultCreator()(ast, Object.assign({}, info, {
                adjustThemeProperties: ['moveTabsScroll', 'scrollSelectedIntoView', 'getConditionalElements', 'updateScrollButtonState'],
                adjustThemeMethods: ['updateIndicatorState']
            } as Ast.MUISourceInfo))
            break
        default:
            if (info.withStylesOrTheme) Tasks.withStylesTaskDefaultCreator()(ast, info)
            //else if (info.withTheme) Tasks.withThemeTaskDefaultCreator()(ast, info)
            else Tasks.otherTaskDefaultCreator()(ast, info)
            break
    }
    code = Parser.generateFileContent(ast)

    //********** COMPONENTS: TYPED EXPORTS
    if (info.withStylesOrTheme) {
        code = tsShape(info, true) + code + tsShape(info, false)
    }

    code = Config.msgAutoGenerated + code

    return code
}

const insertAfterImports = (code: string, insert: string) => {
    const parts = code.split(/import .*[\n\r]/)
    const importEndIdx = code.length - parts[parts.length - 1].length
    return code.substr(0, importEndIdx) + insert + code.substr(importEndIdx)
}

const tsShape = (info: Ast.MUISourceInfo, isStart: boolean) =>
    isStart ?
        `import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme } from '../styles/withStyles';
` : `
export type Shape = Types.OverwriteShape<{
  ${!noKey[info.name] && !info.withTheme ? `common: TCommon.ShapeTexts<${info.name}ClassKey>,` : ''}
  props: ${info.name}Props,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

${info.defaultPropsStr ? `export const defaultProps  = ${info.name}['defaultProps'] = ${info.defaultPropsStr} as PropsX;` : ''}
export const ${info.name}Code: CodeComponentType = ${info.name} as any
export const ${info.name}Styles: SheetCreatorX = styles as any
export const ${info.name}Creator: WithStyleCreator = withStyles<Shape>(${info.name}Styles, ${info.name}Code, {isMui:true, defaultProps});
export const ${info.name}Component: React.${info.isClass ? 'ComponentClass' : 'ComponentType'}<PropsX> = ${info.name}Creator();
if ((${info.name} as any).muiName) (${info.name}Component as any).muiName = (${info.name} as any).muiName;


export default ${info.name}
`
const noKey = {
    'SwipeArea': true,
    'Stepper': true,
    'StepLabel': true,
    'Step': true,
    'StepIcon': true,
    'StepContent': true,
    'StepConnector': true,
    'StepButton': true,
    'HiddenCss': true,
}

