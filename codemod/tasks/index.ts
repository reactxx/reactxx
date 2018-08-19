import * as fs from 'fs'
import * as Config from '../utils/config'
import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'
import * as fsExtra from 'fs-extra';
import { readAllCodes, scanDir } from '../utils/readAllCodes'
import { transform } from './transform'

export const codeMod = () => {

    try { fsExtra.emptyDirSync(Config.muiWeb) } catch { }

    const { log, codeStr } = readAllCodes()

    for (const path in log) {
        const info = log[path]

        if (info.dir != 'Paper' && (info.nameIsUppercase || (info.dirIsUppercase && info.name === 'index'))) continue
        //if (info.dirIsUppercase && info.name === 'index') continue

        let code = codeStr[path]

        const dtsFn = Config.patchOriginal + path + '.d.ts'
        const dts = fs.existsSync(dtsFn) ? fs.readFileSync(dtsFn, { encoding: 'utf-8' }) : null

        info.withTheme = code.indexOf('withTheme(') > 0
        if (!info.withTheme) info.withStyles = code.indexOf('withStyles(styles') > 0

        code = transform(code, info, dts)

        fsExtra.outputFileSync(info.destPath + '.tsx', code)
    }

    fsExtra.copySync(Config.muix_WebSources, Config.muiWeb, { overwrite: true })
}
