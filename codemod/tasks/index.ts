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

export type Specials = { [path: string]: Ast.FileDescr }

export const specials: Specials = {}

registerButtonBase(specials)
registerInput(specials)
registerNativeSelectInput(specials)
registerSelectInput(specials)
registerGrid(specials)

export const codeMod = () => {

    const { log, code } = readAllCodes()

    try { fsExtra.rmdirSync(Config.reactxxMuiWebShapes) } catch { }
    try { fsExtra.rmdirSync(Config.reactxxMuiWebShapesDest) } catch { }

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
            fsExtra.outputFileSync(Config.reactxxMuiWebShapes + path + '.ts', noKey[logp.name] ? tsShapeNoKey(logp.dir, logp.name) : tsShape(logp.dir, logp.name), { flag: 'w' })
        }
    }

    fsExtra.copySync(Config.reactxxMuiWeb, Config.src, { overwrite: true })

}

const tsShape = (dir: string, name: string) => `
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ${name}ClassKey, ${name}Props } from '../../mui/${dir}/${name}';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<${name}ClassKey>,
  props: ${name}Props,
  theme: Theme
}>
`
const tsShapeNoKey = (dir: string, name: string) => `
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ${name}Props } from '../../mui/${dir}/${name}';

export type Shape = Types.OverwriteShape<{
  props: ${name}Props,
  theme: Theme
}>
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
            srcPath: Config.src + path + '.js',
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
        const withStylesOrWithTheme = (name:string) => Queries.checkSingleResult(Ast.astq().query(root,
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

const getAllComponents = () => Glob.sync('/**/!(index).js', { root: Config.src }).
    map(f => f.substr(Config.src.length)).
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

