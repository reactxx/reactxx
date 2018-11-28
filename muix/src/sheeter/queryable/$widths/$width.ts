import { TEngine } from 'reactxx-typings'
import { processTree, makeTemporary } from '../../utils/atomize-low'
import { intervalToSelector, test } from './parser'

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

export default $width