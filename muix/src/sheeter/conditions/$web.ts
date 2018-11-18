import { TSheeter, TCommonStyles, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

const $web = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(...rulesets: TSheeter.RulesetWebOrAtomized<T>[]) => {
    return rulesets && window.isWeb && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        processTree(rulesets, atomizedVariants, path, pseudoPrefixes, conditions)
    })
}

export default $web