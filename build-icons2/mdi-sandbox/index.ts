import * as Glob from 'glob'
import * as Config from '../utils/config'
import * as mdiSandbox from './data.json'
import * as FSExtra from 'fs-extra'

const getMiToMdi = () => {
    const allMi: string[] = Glob.sync('/**/*.*', { root: Config.iconMi }).map(f => f.split('\\')).map(parts => parts[parts.length - 1]).map(fn => fn.substring(beg.length, fn.length - end.length).replace(/_/g, '-'))

    //*********
    const miToMdi: { [id: string]: string[] } = {}
    allMi.forEach(mi => miToMdi[mi] = [])
    for (const key in mdiSandbox) {
        const icon = mdiSandbox[key]
        allMi.forEach(it => {
            const words = it.split(/[\s\-]/)
            if (key === it) {
                miToMdi[it] = [null]
                return
            }
            if (miToMdi[it][0] === null)
                return
            if (!icon.articles.main)
                return
            if (!words.every(word => icon.keywords.some(item => item.startsWith(word))))
                return
            miToMdi[it].push(key + (icon.contributor==='google' ? ':g' : ''))
        })
    }
    const notFound = []
    for (const p in miToMdi) if (miToMdi[p].length===0) notFound.push(p)
    FSExtra.outputFileSync(Config.mdiSandbox + 'mi2mdi.json', JSON.stringify(miToMdi, null,2), {encoding:'utf8'})
    FSExtra.outputFileSync(Config.mdiSandbox + 'miNotFound.json', JSON.stringify(notFound, null,2), {encoding:'utf8'})
    return
}
const beg = 'ic_'
const end = '_24px.svg'


getMiToMdi()