import { TEngine } from 'reactxx-typings'
import { processTree, makeTemporary } from '../../utils/atomize-low'
import { intervalToSelector, test } from './parser'

export interface $WidthsQuery { 
    $widths?: {
        actWidth: number
        breakpoints?: Set<number>
    }
}

const $width = (
    interval: number | [number, number], ...rulesets: TEngine.Rulesets[]
) => {
    return rulesets && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        if (window.isWeb) {
            // WEB: use media query CSS
            pseudoPrefixes = [...pseudoPrefixes, intervalToSelector(interval)]
        } else {
            // NATIVE: use conditional ruleset
            conditions = [...conditions, {
                type: '$width',
                test: ({ $widths }: $WidthsQuery = {}) => $widths && test(interval, $widths.actWidth, $widths.breakpoints)
            }]
        }
        processTree(rulesets, atomizedVariants, path + '/$width', pseudoPrefixes, conditions)
    })
}

export default $width