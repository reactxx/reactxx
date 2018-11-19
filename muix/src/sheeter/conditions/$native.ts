import { TSheeter, TCommonStyles, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

const $native = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(...rulesets: TSheeter.RulesetNativeItem<T>[]) => {
    return rulesets && !window.isWeb && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        processTree(rulesets, atomizedVariants, path + '/$native', pseudoPrefixes, conditions)
    })
}

export default $native