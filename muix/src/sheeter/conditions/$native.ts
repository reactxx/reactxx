import { TSheeter, TCommonStyles, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

function $native<T extends TCommonStyles.RulesetNativeIds = '$NativeText'>(...rulesets: TSheeter.RulesetNativeOrAtomized<T>[]) {
    return rulesets && !window.isWeb && makeTemporary<T>(arguments, (args: TAtomize.Item[], ...ctx) => {
        return processTree(args, ...ctx)
    })
}

export default $native