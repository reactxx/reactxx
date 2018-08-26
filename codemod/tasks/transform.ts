import * as Config from '../utils/config'

import { replaceAll } from '../utils/regexp'
import * as Ast from '../utils/ast'
import * as Tasks from './ast/default-modifier'
import * as Parser from '../utils/parser'
import * as Queries from '../utils/queries'
import { gridAst } from './ast-comp/Grid'

import { removePropTypes } from './ast/removePropTypes'
import { adjustImports } from './code/adjustImports'

import { processScript } from './transform-code'

export const transform = (code: string, info: Ast.MUISourceInfo, dts: string) => {

    console.log(info.path)

    code = processScript(info, code)
    if (!code) return null

    //********** INCLUDE TYPESCRIPT DEFINITIONS
    if (dts) {
        // solves mui index.ts PropTypes collision with import PropTypes from 'prop-types
        dts = dts.replace(/PropTypes, StandardProps|StandardProps, PropTypes/, 'StandardProps, PropTypes as muiPropTypes')
        dts = dts.replace(/PropTypes\./g, 'muiPropTypes.')

        dts = dts.replace(/\ninterface /g, '\nexport interface ')
        dts = dts.replace(`import * as React from 'react';`, '')
        dts = dts.replace(/\ntype /g, '\nexport type ')
        dts = dts.replace(`import { Theme } from '../styles/createMuiTheme';`, ``)

        if (info.addProps && !info.withStylesOrTheme)
            dts = dts.replace(`export interface ${info.name}Props {`, `export interface ${info.name}Props {\n  ${info.addProps}`)

        dts = dts.replace(`children: React.ReactElement<any>`, `children?: React.ReactElement<any>`)
        dts = dts.replace(`children: React.ReactNode`, `children?: React.ReactNode`)

        switch (info.path) {
            case 'Modal/Modal':
                dts = dts.replace("import { StandardProps, ModalManager", "import { StandardProps")
                break
            case 'ButtonBase/TouchRipple':
                dts = dts.replace("import { TransitionGroup } from 'react-transition-group';", "")
                break
            case 'ClickAwayListener/ClickAwayListener':
                dts = dts.replace("onClickAway:", "onClickAway?:")
                break
            case 'internal/SwitchBase':
                dts = dts.replace("export type SwitchBase = React.Component<SwitchBaseProps>;", "")
                break
            case 'styles/createMuiTheme':
                dts = dts.replace("import { Overrides } from './overrides';", "")
                dts = dts.replace("import { ComponentsProps } from './props';", "")
                dts = replaceAll(dts, "props?: ComponentsProps;", "")
                dts = replaceAll(dts, "overrides?: Overrides;", "")
                break
        }

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
    code = adjustImports(code)

    switch (info.path) {
        case 'styles/index':
            code = code.replace(`export { default as MuiThemeProvider } from './MuiThemeProvider';`, ``)
            code += `\nexport { StyledComponentProps, StyleRules } from "./withStyles";`
            break
        case 'ButtonBase/ButtonBase':
            code = code.replace("tabIndex: '0',", "tabIndex: 0,")
            break
    }

    //**********AST MODIFICATION
    const ast = Parser.parseCode(code)
    {
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
                const callExpression = Queries.checkSingleResult(Ast.astq().query(ast, `// CallExpression [ /Identifier [@name == "classNames"] && // LogicalExpression/Identifier [ @name == "shrink"] ]`))
                const shrink = Queries.checkSingleResult(Ast.astq().query(callExpression, `// LogicalExpression [ /Identifier [ @name == "shrink"] ]`))
                const margin = Queries.checkSingleResult(Ast.astq().query(callExpression, `// LogicalExpression [/BinaryExpression/Identifier [ @name == "margin"] ]`))
                const shrinkIdx = (callExpression.arguments as any[]).indexOf(shrink)
                const marginIdx = (callExpression.arguments as any[]).indexOf(margin)
                callExpression.arguments[shrinkIdx] = margin
                callExpression.arguments[marginIdx] = shrink
                break
            default:
                if (info.withStylesOrTheme) Tasks.withStylesTaskDefaultCreator()(ast, info)
                break
        }
    }
    removePropTypes(ast, info)
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
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
` : `
export type Shape = Types.OverwriteShape<{
  ${!noKey[info.name] && !info.withTheme ? `common: TCommon.ShapeTexts<${info.name}ClassKey>,` : ''}
  props: ${info.name}Props${info.addProps ? ` & { ${info.addProps} }` : ''},
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

${info.defaultPropsStr ? `export const defaultProps  = ${info.name}.defaultProps = ${info.defaultPropsStr} as CodeProps;` : ''}
export const ${info.name}Code: CodeComponentType = ${info.name} as any
export const ${info.name}Styles: SheetCreatorX = styles as any
export const ${info.name}Creator: WithStyleCreator = withStyles<Shape>(${info.name}Styles, ${info.name}Code, {isMui:true${info.defaultPropsStr ? ', defaultProps' : ''}});
export const ${info.name}Component: React.${info.isClass ? 'ComponentClass' : 'ComponentType'}<PropsX> = ${info.name}Creator();
if ((${info.name} as any).muiName) (${info.name}Component as any).muiName = (${info.name} as any).muiName;


export default ${info.name}Component
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

// const componentNoProp = {
//     'ScrollbarSize': true,
//     'SelectInput': true,
//     'RadioGroup': true,
//     'NoSsr': true,
//     'MenuList': true,
//     'Portal': true,
//     'RootRef': true,
//     'ClickAwayListener': true,
//     'Ripple': true,
// }