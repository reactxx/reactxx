import { TSheeter, TCommonStyles, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

const $width = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(interval: number | [number, number], ...rulesets: TSheeter.RulesetNativeOrAtomized<T>[]) => {
    return rulesets && makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        const cond: TVariants.Condition = {
            type:'$width',
            test: ({actWidth}) => typeof actWidth === 'number' && (typeof interval === 'number' ? actWidth >= interval : actWidth >= interval[0] && actWidth < interval[1])
        }
        processTree(rulesets, atomizedVariants, path + '/$width', pseudoPrefixes, [...conditions, cond])
    })
}

export default $width