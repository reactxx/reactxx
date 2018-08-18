import * as fs from 'fs';
import * as Glob from 'glob';
import * as Ast from './ast';
import * as Config from './config';

export const readAllCodes = () => {
    const log: { [path: string]: Ast.MUISourceInfo } = {}
    const codeStr: { [path: string]: string } = {}
    const compileErrors = []
    getAllJS().forEach(comp => {
        const path = `${comp[0]}/${comp[1]}`
        // collect LOG info
        const logItem: Ast.MUISourceInfo = log[path] = {
            dir: comp[0],
            name: comp[1],
            destPath: Config.muiWeb + path,
            origPath: Config.patchOriginal + path + '.js',
            path,
        }
        // logItem.origExists = fs.existsSync(logItem.origPath)
        //const actPath = logItem.origExists ? logItem.origPath : logItem.destPath

        // read JS file
        try { codeStr[path] = fs.readFileSync(logItem.origPath, { encoding: 'utf-8' }) } catch { compileErrors.push(logItem.origPath); return }

        logItem.nameIsUppercase = logItem.name.startsWith('svg-icons') || logItem.name.charAt(0).toLowerCase() !== logItem.name.charAt(0)
        logItem.dirIsUppercase = logItem.dir.charAt(0).toLowerCase() !== logItem.dir.charAt(0)
    })
    //const dump = JSON.stringify(log, null, 2)
    //return { log, code, codeStr, compileErrors }
    return { log, codeStr, compileErrors }
}

export const scanDir = (dir:string, mask: string) => Glob.sync(mask, { root: dir }).map(f => f.substr(dir.length))

const getAllJS = () => {
    //return scanDir(Config.patchOriginal, '/**/!(index).js').
    return scanDir(Config.patchOriginal, '/*/*.js').
        map(f => {
            let res: any[] = f.substr(0, f.length - 3).split('\\')
            if (res.length > 2) {
                const names = res.slice(1)
                res = [res[0], names.join('/')]
            }
            return res as [string, string]
        })
}

