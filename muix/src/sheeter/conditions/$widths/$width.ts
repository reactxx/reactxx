import React from 'react'
import { TSheeter, TCommonStyles, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../../utils/atomize-low'
import { intervalToSelector, test } from './parser'

export interface $WidthsQuery {
    $widths?: {
        actWidth: number
        breakpoints?: Set<number>
    }
}

const $width = <T extends TCommonStyles.RulesetIds = 'Text'>(
    interval: number | [number, number], ...rulesets: TSheeter.RulesetOrAtomized<T>[]
) => {
    return rulesets && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
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