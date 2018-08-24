import * as Config from '../utils/config'

import * as Ast from '../utils/ast'
import * as Tasks from './ast/default-modifier'
import * as Parser from '../utils/parser'
import * as Queries from '../utils/queries'
import { gridAst } from './ast-comp/Grid'
import { touchRippleAst } from './ast-comp/TouchRipple'

import { removePropTypes } from './ast/removePropTypes'
import { adjustImports } from './code/adjustImports'

import {processScript} from './transform-script'

export const transform = (code: string, info: Ast.MUISourceInfo, dts: string) => {

    console.log(info.path)

    code = processScript (info, code)
    if (!code) return null

    //********** COMMON  STRING REPLACE
    {
        if (sfcWithProp[info.name]) {
            code = code.replace(`\nimport`, `import {Types} from 'reactxx-basic'\nimport`)
            code = code.replace(`\nfunction ${info.name}`,
                `\nexport type Shape = Types.OverwriteShape<{\n  props: ${info.name}Props\n}>;\nfunction ${info.name}`)
        }
        if (componentNoProp[info.name]) {
            code = code.replace(`\nclass ${info.name}`,
                `\ninterface ${info.name}Props { children?; [p:string]: any }\nexport type CodeProps = ${info.name}Props\nclass ${info.name}`)
        }
        if (info.overrideReactIsValidElement) {
            code = code.replace(`React.isValidElement`, `(React as any).isValidElement`)
        }

        code = code.replace(/\{\.\.\.(\w+)\}/g, `{...$1 as any}`) // {...props} => {...props as any}
        code = code.replace(/options\s*=\s*{}/, `options: any = {}`)
        code = code.replace(`, child => {`, `, (child: React.ReactElement<any>) => {`)
        code = code.replace(`import classNames from 'classnames';`, `import { classNames } from 'reactxx-basic';`)
        code = code.replace(`class ${info.name} extends React.Component {`,
            `class ${info.name} extends React.Component<CodeProps,any> {
  static defaultProps: CodeProps
  static muiName
  static displayName
  static contextTypes
  static childContextTypes
  ${info.componentFields ? info.componentFields : ''}
  static options`)
        code = code.replace(`\nfunction ${info.name}(props) {`, `const ${info.name}: Types.CodeSFCWeb<Shape> = (props) => {`)
        code = code.replace(`\nfunction ${info.name}(props, context) {`, `const ${info.name}: Types.CodeSFCWeb<Shape> = (props, context) => {`)
        code = code.replace(`  state = {`, `  state: any = {`)
        code = code.replace(`super();`, `super(props);`)
        code = code.replace(`import withTheme from '../styles/withTheme';`, ``)
        code = code.replace(`import withStyles from '../styles/withStyles';`, ``)
        code = code.replace(`export const styles =`, `const styles =`)
        if (info.withStylesOrTheme && code.indexOf(`const styles =`) < 0)
            code += '\nconst styles = {}\n'

        code = code.replace(``, ``)
    }

    //********** INCLUDE TYPESCRIPT DEFINITIONS
    if (dts) {
        // solves mui index.ts PropTypes collision with import PropTypes from 'prop-types
        dts = dts.replace(/PropTypes, StandardProps|StandardProps, PropTypes/, 'StandardProps, PropTypes as muiPropTypes')
        dts = dts.replace(/PropTypes\./g, 'muiPropTypes.')

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
    code = adjustImports(code)

    switch (info.path) {
        case 'styles/index':
            code = code.replace(`export { default as MuiThemeProvider } from './MuiThemeProvider';`, ``)
            code += `\nexport { StyledComponentProps, StyleRules } from "./withStyles";`
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
                if (info.withStylesOrTheme) Tasks.withStylesTaskDefaultCreator()(ast, info)
                //else if (info.withTheme) Tasks.withThemeTaskDefaultCreator()(ast, info)
                //else Tasks.otherTaskDefaultCreator()(ast, info)
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
import withStyles, { Theme } from '../styles/withStyles';
` : `
export type Shape = Types.OverwriteShape<{
  ${!noKey[info.name] && !info.withTheme ? `common: TCommon.ShapeTexts<${info.name}ClassKey>,` : ''}
  props: ${info.name}Props${info.addToProps ? ` & { ${info.addToProps} }` : ''},
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

const sfcWithProp = {
    'Hidden': true,
    'TextField': true,
    'NativeSelectInput': true,
}

const componentNoProp = {
    'ScrollbarSize': true,
    'SelectInput': true,
    'RadioGroup': true,
    'NoSsr': true,
    'MenuList': true,
    'Portal': true,
    'RootRef': true,
    'ClickAwayListener': true,
    'Ripple': true,
}