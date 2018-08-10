import * as map from './map.json'
import * as Case from 'change-case'
import * as Config from '../utils/config'
import * as FSExtra from 'fs-extra'

export const generate = () => {
    //FSExtra.removeSync(Config.icons)
    for (const p in map) {
        const icon = map[p]
        const name = Case.pascalCase(icon.id)
        const fn = Config.icons + name + '.tsx'
        const fnNative = Config.icons + 'native/' + name + '.tsx'
        FSExtra.outputFileSync(fn, template(icon.svg, name, icon.isMdi), { encoding: 'utf8' })
        FSExtra.outputFileSync(fnNative, template(icon.id, name, icon.isMdi), { encoding: 'utf8' })
    }
    const fnMeta = Config.icons + 'lib/meta.ts'
    const fnNative = Config.icons + 'native/lib/meta.ts'
    const metaCode = 'export const meta = ' + JSON.stringify(map, null, 2)
    FSExtra.outputFileSync(fnMeta, metaCode, { encoding: 'utf8' })
    FSExtra.outputFileSync(fnNative, metaCode, { encoding: 'utf8' })
}

const template = (data:string, name:string, isMdi:boolean) =>
`import createSvgIcon from './lib/create-svg-icon'

export default createSvgIcon(
  '${data}',
  '${name}',
  ${isMdi ? 'true' : 'false'}
)`

