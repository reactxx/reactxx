import * as Glob from 'glob'
import * as fs from 'fs'
import * as Config from '../utils/config'
import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'
import * as fsExtra from 'fs-extra';
import * as Tasks from '../tasks/default-modifier'

import { registerTouchRipple } from '../patch-code/ButtonBase/TouchRipple'
import { registerWithStyles } from '../patch-code/styles/withStyles'

export interface MUISourceInfo {
    dir: string
    name: string
    withStyles?: string
    withTheme?: string
    srcPath?: string
    origPath?: string
    origExists?: boolean
}

export type Specials = { [path: string]: Ast.FileDescr }

export const specials: Specials = {}

registerTouchRipple(specials)
registerWithStyles(specials)

export const codeMod = () => {
    const { log, code } = readAllCodes()

    for (const path in log) {
        const logp = log[path]
        const specItem = specials[path]
        const transformStr = specItem && specItem.transformStr
        if (transformStr) {
            if (!logp.origExists) fsExtra.moveSync(logp.srcPath, logp.origPath)
            const code = fs.readFileSync(logp.origPath, { encoding: 'utf-8' })
            fsExtra.outputFileSync(logp.srcPath, transformStr(code))
        } else {
            const transform = logp.withStyles && ((specItem && specItem.transform) || Tasks.taskDefaultCreator(logp.withStyles))
            if (!transform) continue
            if (!logp.origExists) fsExtra.moveSync(logp.srcPath, logp.origPath)
            const ast = code[path]
            transform(ast)
            Parser.generateFile(ast, logp.srcPath)
        }
    }
}


export const readAllCodes = () => {
    const log: { [path: string]: MUISourceInfo } = {}
    const code: { [path: string]: Ast.Ast } = {}
    getAllComponents().forEach(comp => {
        const path = `${comp[0]}/${comp[1]}`
        // collect LOG info
        const logItem: MUISourceInfo = {
            dir: comp[0],
            name: comp[1],
            srcPath: Config.src + path + '.js',
            origPath: Config.patchOriginal + path + '.js',
        }
        log[path] = logItem
        logItem.origExists = fs.existsSync(logItem.origPath)
        const actPath = logItem.origExists ? logItem.origPath : logItem.srcPath

        // parse JS file
        const root = code[path] = Parser.parseFile(actPath)

        // get withStyles or withTheme component name ...
        const withStylesOrWithTheme = (isWithStyle: boolean) => Queries.checkSingleResult(Ast.astq().query(root,
            `/Program/ExportDefaultDeclaration/CallExpression [ /CallExpression/Identifier [ @name=="${isWithStyle ? 'withStyles' : 'withTheme'}" ] ] /Identifier`), true)
        const withStyles = withStylesOrWithTheme(true)
        const withTheme = withStylesOrWithTheme(false)

        // ... and put it to log
        if (withTheme)
            logItem.withTheme = withTheme.name
        else if (withStyles)
            logItem.withStyles = withStyles.name
    })
    const dump = JSON.stringify(log, null, 2)
    return { log, code }
}

const getAllComponents = () => Glob.sync('/**/!(index).js', { root: Config.src }).
    map(f => f.substr(Config.src.length)).
    filter(f => f.charAt(0) === f.charAt(0).toUpperCase()).
    map(f => f.substr(0, f.length - 3).
        split('\\') as [string, string]
    )

