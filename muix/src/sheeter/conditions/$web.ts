import { TSheeter, TCommonStyles, TTyped, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $web = (...rulesets: TSheeter.RulesetWebItem[]) => {
    return rulesets && window.isWeb && makeTemporary<'$Web'>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        processTree(rulesets, atomizedVariants, path + '/$web', pseudoPrefixes, conditions)
    })
}

export default $web