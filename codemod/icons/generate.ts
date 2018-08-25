import * as map from './map.json'
import * as Case from 'change-case'
import * as Config from '../utils/config'
import * as fsExtra from 'fs-extra'
import * as tsconfig from './icons-project-tsconfig.json'

export const generate = () => {
    fsExtra.emptyDirSync(Config.icons)
    const internals = {}
    for (const p in map) {
        if (p==='react') continue
        const icon = map[p]
        const name = Case.pascalCase(icon.id)
        const fn = Config.icons + name + '.tsx'
        //const fnNative = Config.icons + 'native/' + name + '.tsx'
        fsExtra.outputFileSync(fn, template(icon.svg, name, icon.isMdi, false), { encoding: 'utf8' })
        if (muiInternals.indexOf(name) >= 0)
            internals[name] = template(icon.svg, name, icon.isMdi, true)
        //FSExtra.outputFileSync(fnNative, template(icon.id, name, icon.isMdi), { encoding: 'utf8' })
    }
    const metaCode = 'export const meta = ' + JSON.stringify(map, null, 2)
    fsExtra.outputFileSync(Config.icons + 'meta.ts', metaCode, { encoding: 'utf8' })
    fsExtra.outputFileSync(Config.icons + 'tsconfig.json', JSON.stringify(tsconfig, null, 2), { encoding: 'utf8' })

    //FSExtra.outputFileSync(Config.icons + 'native/meta.ts', metaCode, { encoding: 'utf8' })
    for (const p in internals) {
        const dest = Config.muix_WebSources + 'internal/svg-icons/' + p + '.tsx'
        fsExtra.outputFileSync(dest, internals[p], { encoding: 'utf8' })
    }
}

const template = (data: string, name: string, isMdi: boolean, isMuiInternal: boolean) =>
    `import createSvgIcon from '${isMuiInternal ? '.' : 'reactxx-mui-web/internal/svg-icons'}/create-svg-icon'

export default createSvgIcon(
  '${data}',
  '${name}',
  ${isMdi ? 'true' : 'false'}
)`

const muiInternals = [
    'ArrowDownward',
    'ArrowDropDown',
    'Cancel',
    'CheckBox',
    'CheckBoxOutlineBlank',
    'CheckCircle',
    'IndeterminateCheckBox',
    'KeyboardArrowLeft',
    'KeyboardArrowRight',
    'RadioButtonChecked',
    'RadioButtonUnchecked',
    'Warning',
]