import * as Ast from '../../utils/ast'
import { replaceAll } from '../../utils/regexp'
import * as Tasks from '../default-modifier'
import * as Parser from '../../utils/parser'
import * as Queries from '../../utils/queries'

export const transformStrCode = (code: string, info: Ast.MUISourceInfo, dts: string, all) => {

    switch (info.path) {
        case 'GridListTile/GridListTile':
            code = code.replace(`\nimport`, `\nimport {fitPatch} from './GridListTilePatch';\nimport`)
            code = code.replace(`fit = () => {`, `  fit = fitPatch.bind(this)\n  fit_ = () => {`)
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
        case '':
            code = code.replace(``, ``)
            break
        case '':
            code = code.replace(``, ``)
            break
    }

    code = code.replace(/options\s*=\s*{}/, `options: any = {}`)
    code = code.replace(`import classNames from 'classnames';`, `import { classNames } from 'reactxx-basic';`)
    code = code.replace(`extends React.Component {`, `extends React.Component<any,any> {\n static propTypes\n  static displayName\n static contextTypes\n static Naked\n  static options`)
    code = code.replace(`  state = {};`, `  state: any = {};`)
    code = code.replace(`super();`, `super(props);`)
    code = code.replace(``, ``)
    code = code.replace(``, ``)

    if (dts) {
        dts = dts.replace(/\ninterface /g, '\nexport interface ')
        dts = dts.replace(/\ntype /g, '\nexport type ')
        const ast = Parser.parseCode(dts)
        //if (info.path === 'styles/index') debugger
        ast.program.body = (ast.program.body as any[]).filter(node =>
            // !node.declare &&
            node.type === 'ImportDeclaration' ||
            // (node.type != 'ExportNamedDeclaration' || node.exportKind !='type') &&
            (node.declaration && (
                node.declaration.type === 'TSInterfaceDeclaration' ||
                node.declaration.type === 'TSTypeAliasDeclaration'
            ))

        )
        let dtsCode = Parser.generateCode(ast)
        if (dtsCode.length > 0)
            code = insertAfterImports(code, dtsCode)
        // let temp = Parser.**parseCode(code)
        // code = code + '\n' + dtsCode + '\n'
        // temp = Parser.parseCode(code)
        //code = code + '\n' + Parser.generateCode(ast) + '\n'

    }

    switch (info.path) {
        case 'styles/index':
            code = code.replace(`export { default as MuiThemeProvider } from './MuiThemeProvider';`, ``)
            code += `\nexport { StyledComponentProps, StyleRules } from "./withStyles";`
            break
    }

    return code
}

const insertAfterImports = (code: string, insert: string) => {
    const parts = code.split(/import .*\n/)
    const importEndIdx = code.length - parts[parts.length - 1].length
    return code.substr(0, importEndIdx) + insert + code.substr(importEndIdx)
}

