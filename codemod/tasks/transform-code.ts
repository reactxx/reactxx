import * as Ast from '../utils/ast'
import { scripts } from './transform-script'

export const enum Flags {
    isValidElementOverride = 0x1,
    ignore = 0x2,
    addEmptyPropsDef = 0x8,
}

export interface Script {
    replace?: Record<string, string>
    transform?: (code: string) => string
    addFields?: string
    addProps?: string
    flags?: Flags,
    adjustThemeProperties?: string[]
    adjustThemeMethods?: string[]
}

export const processScript = (info: Ast.MUISourceInfo, code: string) => {
    const script = scripts[info.path]
    if (!script) return code

    if (script.flags & Flags.ignore) return null

    if (script.transform)
        code = script.transform(code)

    if (script.replace) Object.keys(script.replace).forEach(p => {
        if (!p || p === '') return
        code = code.replace(p, script.replace[p])
    })

    if (script.flags & Flags.isValidElementOverride)
        code = code.replace(`React.isValidElement`, `(React as any).isValidElement`)

    if (script.flags & Flags.addEmptyPropsDef)
        code = code.replace(`\nclass ${info.name}`, `\ninterface ${info.name}Props { children?; [p:string]: any }\n\nclass ${info.name}`)

    info.addProps = script.addProps
    info.addFields = script.addFields
    info.adjustThemeProperties = script.adjustThemeProperties
    info.adjustThemeMethods = script.adjustThemeMethods

    //********** COMMON  STRING REPLACE
    code = code.replace(/\{\.\.\.(\w+)\}/g, `{...$1 as any}`) // {...props} => {...props as any}
    code = code.replace(/options\s*=\s*{}/, `options: any = {}`)
    code = code.replace(`, child => {`, `, (child: React.ReactElement<any>) => {`)
    code = code.replace(`import classNames from 'classnames';`, `import { classNames } from 'reactxx-basic';`)

    const compPropsName = info.withStylesOrTheme ? 'CodeProps' : `${info.name}Props`
    code = code.replace(`class ${info.name} extends React.Component {`,
        `class ${info.name} extends React.Component<${compPropsName},any> {
  static defaultProps: ${compPropsName}
  static muiName
  static displayName
  static contextTypes
  static childContextTypes
  ${info.addFields ? info.addFields : ''}
  static options`)
    code = code.replace(`\nfunction ${info.name}(props) {`,
        `const ${info.name}: ${info.withStylesOrTheme ? 'Types.CodeSFCWeb<Shape>' : `React.SFC<${compPropsName}>`} & {muiName?: string} = (props) => {`)
    code = code.replace(`\nfunction ${info.name}(props, context) {`,
        `const ${info.name}: ${info.withStylesOrTheme ? 'Types.CodeSFCWeb<Shape>' : `React.SFC<${compPropsName}>`} = (props, context) => {`)
    code = code.replace(`  state = {`, `  state: any = {`)
    code = code.replace(`super();`, `super(props);`)
    code = code.replace(`import withTheme from '../styles/withTheme';`, ``)
    code = code.replace(`import withStyles from '../styles/withStyles';`, ``)
    if (info.withStylesOrTheme && code.indexOf(`const styles =`) < 0)
        code += '\nconst styles = {}\n'
    else
        //code = code.replace(`export const styles =`, `const styles${info.withStylesOrTheme && !info.withTheme ? ': Types.SheetCreatorX<Shape>' : ''} =`) //
        code = code.replace(`export const styles =`, `const styles =`) //

    return code
}

