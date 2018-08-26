import * as fs from 'fs'
import * as Config from '../utils/config'
import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'
import * as fsExtra from 'fs-extra';
import { readAllCodes, scanDir } from '../utils/readAllCodes'
import { transform } from './transform'

export const codeMod = (toMuixCurrent = false) => {

    Config.setIsDoc(false)

    try { fsExtra.emptyDirSync(toMuixCurrent ? Config.muix_Web : Config.muiWeb) } catch { }

    const { log, codeStr } = readAllCodes()

    // const script = {}
    // for (const path in log) script[path] = { replace: { '': '' }, replaceAll: { '': '' }, componentFields: '', addToProps: '' }
    // let scriptStr = JSON.stringify(script, null, 2)

    for (const path in log) {

        if (ignores[path]) continue

        const info = log[path]

        //if (info.dir != 'Paper' && (info.nameIsUppercase || (info.dirIsUppercase && info.name === 'index'))) continue
        //if (info.dirIsUppercase && info.name === 'index') continue

        let code = codeStr[path]

        info.withStylesOrTheme = info.withTheme = path != 'withWidth/withWidth' && code.indexOf('withTheme(') > 0
        if (!info.withStylesOrTheme) info.withStylesOrTheme = code.indexOf('withStyles(styles') > 0 || code.indexOf('withStyles(nativeSelectStyles') > 0

        if (toMuixCurrent) {
            if (!info.withStylesOrTheme || info.withTheme) continue
            fsExtra.outputFileSync(Config.muix_Web + info.path + '.ts', '')
        } else {
            const dtsFn = Config.patchOriginal + path + '.d.ts'
            const dts = fs.existsSync(dtsFn) ? fs.readFileSync(dtsFn, { encoding: 'utf-8' }) : null
            code = transform(code, info, dts)
            if (!code) continue
            fsExtra.outputFileSync(info.destPath + '.tsx', code)
        }

    }
    if (!toMuixCurrent) {
        fsExtra.copySync(Config.patchOriginal + 'transitions/transition.d.ts', Config.muiWeb + 'transitions/transition.ts')
        fsExtra.copySync(Config.muix_WebSources, Config.muiWeb, { overwrite: true })
        fsExtra.copySync(Config.reactxx + 'src/typings.d.ts', Config.muiWeb + 'typings.d.ts', { overwrite: true })
    }
}

const ignores = {
    'styles/withStyles': true,
    'styles/index': true,
    'utils/reactHelpers': true,
    'withWidth/withWidth': true,
    'withWidth/index': true,
    'withMobileDialog/withMobileDialog': true,
    'withMobileDialog/index': true,
    'styles/MuiThemeProvider': true,
    'styles/jssPreset': true,
    'styles/getStylesCreator': true,
}

const muixCurrent = (path: string) => {}
