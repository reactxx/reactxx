import * as Glob from 'glob'
import * as Config from '../utils/config'
import * as FSExtra from 'fs-extra'
import * as MaterialCommunityIcons from './MaterialCommunityIcons.json'
import * as MaterialIcons from './MaterialIcons.json'
import * as Xml2js from 'xml2js'

export const getIconMap = () => {
    const miSvgs = getMiSVG()
    const map: Record<string, Icon> = {}
    const errorMap: Record<string, Icon> = {}
    for (const p in MaterialIcons) {
        const svg = miSvgs[p]
        const res: Icon = { id: p, isMdi: false, fontId: MaterialIcons[p], svg };
        (svg ? map : errorMap)[p] = res
    }
    for (const p in MaterialCommunityIcons) {
        const svg = getMdiSvg(p)
        const mi = map[p]
        if (svg && mi)
            mi.svgMdi = svg
        else {
            const res: Icon = { id: p, isMdi: true, fontId: MaterialIcons[p], svg };
            (svg ? map : errorMap)[p] = res
        }
    }
    FSExtra.outputFileSync(Config.expo + 'map.json', JSON.stringify(map, null, 2), { encoding: 'utf8' })
    FSExtra.outputFileSync(Config.expo + 'errors.json', JSON.stringify(errorMap, null, 2), { encoding: 'utf8' })
}

const getMiSVG = () => {
    const paths: Record<string, string> = {}
    const errors: string[] = []
    Glob.sync('/**/*.*', { root: Config.iconMi }).forEach(f => {
        const parts = f.split('\\')
        const fn = parts[parts.length - 1]
        const id = fn.substring(beg.length, fn.length - end.length).replace(/_/g, '-')
        const xml = FSExtra.readFileSync(f, { encoding: 'utf8' })
        Xml2js.parseString(xml, (err, result) => {
            try { paths[id] = result.svg.path[0].$.d } catch { paths[id] = null }
        })
    })
    return paths
}
const beg = 'ic_'
const end = '_24px.svg'

const getMdiSvg = (id: string) => {
    const f = Config.iconMdi + id + '.svg'
    let res: string = null
    try {
        const xml = FSExtra.readFileSync(f, { encoding: 'utf8' })
        Xml2js.parseString(xml, (err, result) => res = result.svg.path[0].$.d)
    }
    catch { }
    return res
}

interface Icon {
    id: string
    svg: string
    isMdi: boolean
    svgMdi?: string
    fontId: number
}

