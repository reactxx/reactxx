import * as Glob from 'glob'
import * as fs from 'fs'
import * as Config from '../utils/config'
import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'
import * as fsExtra from 'fs-extra';
import * as Tasks from './default-modifier'

import { registerButtonBase } from '../patch-code/ButtonBase/ButtonBase'
import { registerInput } from '../patch-code/Input/Input'
import { registerNativeSelectInput } from '../patch-code/NativeSelect/NativeSelectInput'
import { registerSelectInput } from '../patch-code/Select/SelectInput'
import { registerGrid } from '../patch-code/Grid/Grid'
import { registerTabs } from '../patch-code/Tabs/Tabs'
import { registerCollapse } from '../patch-code/Collapse/Collapse'
import { registerInputLabel } from '../patch-code/InputLabel/InputLabel'

export type Specials = { [path: string]: Ast.FileDescr }

export const specials: Specials = {}

registerButtonBase(specials)
registerInput(specials)
registerNativeSelectInput(specials)
registerSelectInput(specials)
registerGrid(specials)
registerTabs(specials)
registerCollapse(specials)
registerInputLabel(specials)

export const codeMod = () => {

    const { log, code } = readAllCodes()

    //try { fsExtra.rmdirSync(Config.reactxxMuiWebShapes) } catch { }
    try { fsExtra.rmdirSync(Config.muiWeb_Typings) } catch { }

    for (const path in log) {
        const logp = log[path]
        const specItem = specials[path]
        const transformStr = specItem && specItem.transformStr
        let transform = specItem && specItem.transform
        if (transformStr) {
            if (!logp.origExists) fsExtra.moveSync(logp.srcPath, logp.origPath)
            const code = fs.readFileSync(logp.origPath, { encoding: 'utf-8' })
            fsExtra.outputFileSync(logp.srcPath, transformStr(code))
        } else {
            if (!transform) {
                transform = specItem && specItem.transform
                if (!transform) {
                    if (logp.withStyles) transform = Tasks.withStylesTaskDefaultCreator()
                    else if (logp.withTheme) transform = Tasks.withThemeTaskDefaultCreator()
                    else transform = Tasks.otherTaskDefaultCreator()
                }
            }
            if (!transform) continue
            if (!logp.origExists) fsExtra.moveSync(logp.srcPath, logp.origPath)
            const ast = code[path]
            transform(ast, logp)
            Parser.generateFile(ast, logp.srcPath)
        }
        // TS shape
        if (logp.withStyles && logp.name !== 'SwipeArea') {
            const ts = Config.muiWeb + path + '.d.ts'
            if (!Parser.canAutoGenerateFile(ts))
                fsExtra.moveSync(ts, ts.replace('.d.ts','_.d.ts'))
            fsExtra.outputFileSync(ts, tsShape(logp.dir, logp.name, !noKey[logp.name]), { flag: 'w' })
            // export TS
            fsExtra.outputFileSync(Config.muix_Web + path + '.ts',
                `${Config.msgAutoGenerated}
import Component from 'reactxx-mui-web/${logp.dir}/${logp.name}'

export * from 'reactxx-mui-web/${logp.dir}/${logp.name}'
export default Component
`
                // `
                // import withStylesCreator from "reactxx-mui-web/styles/withStyles";
                // import {Shape} from 'reactxx-mui-web/typings/${logp.dir}/${logp.name}';
                // import { styles, ${logp.name}, defaultProps } from 'reactxx-mui-web/${logp.dir}/${logp.name}'

                // export const ${logp.name}Creator = withStylesCreator<Shape>(styles, ${logp.name}, {
                //   isMui: true,
                //   defaultProps
                // });
                // export {Shape} from 'reactxx-mui-web/typings/${logp.dir}/${logp.name}';
                // export { styles, ${logp.name}, defaultProps } from 'reactxx-mui-web/${logp.dir}/${logp.name}'

                // const ${logp.name}Component = ${logp.name}Creator();
                // if (${logp.name}['muiName']) ${logp.name}Component['muiName'] = ${logp.name}['muiName']
                // export default ${logp.name}Component;
                // `
                , { flag: 'w' })

        }
    }

    fsExtra.copySync(Config.muix_WebSources, Config.muiWeb, { overwrite: true })

}

// const tsProps = (dir: string, name: string) => `
// export { ${name}Props } from '../../mui-typings/${dir}/${name}';
// `
const tsShape = (dir: string, name: string, key?: boolean) =>
    `${Config.msgAutoGenerated}
import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import { Theme } from '../styles/withStyles';
import { ${key ? `${name}ClassKey, ` : ''}${name}Props } from './${name}_';

export * from './${name}_';
export type Shape = Types.OverwriteShape<{
  ${key ? `common: TCommon.ShapeTexts<${name}ClassKey>,` : ''}
  props: ${name}Props,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export declare const styles: SheetCreatorX
export declare const defaultProps: PropsX
export declare const ${name}Code: CodeComponentType

declare const ${name}: React.Component<PropsX>
export default ${name}
`
const noKey = {
    'Stepper': true,
    'StepLabel': true,
    'Step': true,
    'StepIcon': true,
    'StepContent': true,
    'StepConnector': true,
    'StepButton': true,
    'HiddenCss': true,
}


export const readAllCodes = () => {
    const log: { [path: string]: Ast.MUISourceInfo } = {}
    const code: { [path: string]: Ast.Ast } = {}
    const compileErrors = []
    getAllComponents().forEach(comp => {
        const path = `${comp[0]}/${comp[1]}`
        // collect LOG info
        const logItem: Ast.MUISourceInfo = {
            dir: comp[0],
            name: comp[1],
            srcPath: Config.muiWeb + path + '.js',
            origPath: Config.patchOriginal + path + '.js',
        }
        logItem.origExists = fs.existsSync(logItem.origPath)
        const actPath = logItem.origExists ? logItem.origPath : logItem.srcPath

        // parse JS file
        let root
        try { root = Parser.parseFile(actPath) } catch { compileErrors.push(actPath); return }
        code[path] = root
        log[path] = logItem

        // get withStyles or withTheme component name ...
        const withStylesOrWithTheme = (name: string) => Queries.checkSingleResult(Ast.astq().query(root,
            `/Program/* [ //CallExpression/CallExpression/Identifier [ @name=="${name}" ] ]`), true)
        const withStyles = withStylesOrWithTheme('withStyles')
        const withTheme = withStylesOrWithTheme('withTheme')

        // ... and put it to log
        if (withTheme)
            logItem.withTheme = true
        else if (withStyles)
            logItem.withStyles = true
    })
    //const dump = JSON.stringify(log, null, 2)
    return { log, code, compileErrors }
}

const getAllComponents = () => Glob.sync('/**/!(index).js', { root: Config.muiWeb }).
    map(f => f.substr(Config.muiWeb.length)).
    //filter(f => f.charAt(0) === f.charAt(0).toUpperCase()).
    map(f => {
        let res: any[] = f.substr(0, f.length - 3).split('\\')
        if (res.length > 2) {
            const names = res.slice(1)
            res = [res[0], names.join('/')]
        }
        return res as [string, string]
    }
    )

