import { TSheeter, TCommonStyles, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

const $if = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(
    test: (outerPar, innerPar) => boolean,
    ...rulesets: TSheeter.RulesetItem<T>[]
) => {
    return rulesets && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        const cond = {
            type: '$if',
            test: outerPar => test(outerPar, null)
        }
        processTree(rulesets, atomizedVariants, path + '/$if', pseudoPrefixes, [...conditions, cond])
    })
}

export default $if