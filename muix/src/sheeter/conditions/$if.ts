import { TAtomize, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $if = (
    test: (outerPar) => boolean,
    ...rulesets: TAtomize.Ruleset[]
) => {
    return rulesets && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        const cond: TVariants.Condition = {
            type: '$if',
            test
        }
        processTree(rulesets, atomizedVariants, path + '/$if', pseudoPrefixes, [...conditions, cond])
    })
}

export default $if