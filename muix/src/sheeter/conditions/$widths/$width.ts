import React from 'react'
import { TSheeter, TCommonStyles, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../../atomize-low'
import { intervalToSelector, test } from './parser'
import { QueryState } from '../../to-classnames'

export interface $WidthsQuery extends QueryState {
    actWidth?: number
    allRulesetWidths?: Set<number>
}

const $width = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(interval: number | [number, number], ...rulesets: TSheeter.RulesetNativeOrAtomized<T>[]) => {
    return rulesets && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        if (window.isWeb) {
            pseudoPrefixes = [...pseudoPrefixes, intervalToSelector(interval)]
        } else {
            conditions = [...conditions, {
                type: '$width',
                test: ({ actWidth, allRulesetWidths }: $WidthsQuery = {}) => test(interval, actWidth, allRulesetWidths)
            }]
        }
        processTree(rulesets, atomizedVariants, path + '/$width', pseudoPrefixes, conditions)
    })
}



export default $width