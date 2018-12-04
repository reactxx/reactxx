import { TEngine } from 'reactxx-typings'
import { processTree, makeTemporary } from '../../utils/atomize-low'
import { intervalToSelector } from './parser'

const $width = (
    interval: TEngine.WidthInterval, ...rulesets: TEngine.Rulesets[]
) => {
    return rulesets && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        if (window.isWeb) {
            // WEB: use media query CSS
            pseudoPrefixes = [...pseudoPrefixes, intervalToSelector(interval)]
        } else {
            // NATIVE: use conditional ruleset
            conditions = [...conditions, {
                type: '$width',
                test: ({ $widths }: TEngine.WidthsQuery = {}) => $widths && test(interval, $widths.actWidth, $widths.breakpoints)
            }]
        }
        processTree(rulesets, atomizedVariants, path + '/$width', pseudoPrefixes, conditions)
    })
}

const test = (interval: TEngine.WidthInterval, actWidth: number, registerDir?: Set<number>) => {
    if (registerDir) {
        if (typeof interval === 'number')
            registerDir.add(interval)
        else {
            if (interval[0]) registerDir.add(interval[0])
            registerDir.add(interval[1])
        }
    }
    //**WIDHT**
    return typeof actWidth === 'number' && (typeof interval === 'number' ? actWidth > interval : actWidth > interval[0] && actWidth <= interval[1])
}



export default $width