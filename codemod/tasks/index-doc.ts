import * as Glob from 'glob'
import * as fs from 'fs'
import * as Config from '../utils/config'
import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'
import * as fsExtra from 'fs-extra';
import * as Tasks from './default-modifier'
import { readAllCodes } from './index'

export const codeModDoc = () => {

    const { log, codeStr, code } = readAllCodes()

    //try { fsExtra.rmdirSync(Config.reactxxMuiWebShapes) } catch { }
    //try { fsExtra.rmdirSync(Config.muiWeb_Typings) } catch { }

    for (const path in log) {
        const logp = log[path]
        if (!logp.origExists)
            fsExtra.moveSync(logp.srcPath, logp.origPath)
        // replaces
        let codeDest = codeStr[path]
        replaces.forEach(repl => codeDest = replaceAll(codeDest, repl.src, repl.dest))
        fsExtra.outputFileSync(logp.srcPath.replace('.js','.tsx'), codeDest)
    }
}

const replaces = [
    {src: `import { withStyles } from '@material-ui/core/styles';`, dest: `import withStylesCreator from 'reactxx-mui-web/styles/withStyles'`},
    {src: '@material-ui/core/', dest: 'reactxx-muix/current/'},
    {src:'withStyles(styles', dest:'withStylesCreator(styles as any, {}'},
]

const escapeRegExp = (str:string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
const replaceAll = (str:string, find:string, replace:string) => str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
