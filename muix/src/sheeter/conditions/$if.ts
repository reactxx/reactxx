import { TSheeter, TCommonStyles, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $if = <TPar extends {} = {}, T extends TCommonStyles.RulesetIds = 'Text'>(
    test: (outerPar: TPar) => boolean,
    ...rulesets: TSheeter.RulesetItem<T>[]
) => {
    return rulesets && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        const cond: TVariants.Condition = {
            type: '$if',
            test
        }
        processTree(rulesets, atomizedVariants, path + '/$if', pseudoPrefixes, [...conditions, cond])
    })
}

export default $if