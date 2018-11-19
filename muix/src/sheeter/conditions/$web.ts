import { TSheeter, TCommonStyles, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

const $web = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(...rulesets: TSheeter.RulesetWebItem<T>[]) => {
    return rulesets && window.isWeb && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        processTree(rulesets, atomizedVariants, path + '/$web', pseudoPrefixes, conditions)
    })
}

export default $web