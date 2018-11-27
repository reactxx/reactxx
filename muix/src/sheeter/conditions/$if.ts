import { TAtomize, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $if = (
    test: boolean | ((outerPar) => boolean),
    ...rulesets: TAtomize.Ruleset[]
) => {
    if (!rulesets)
        return false
    if (typeof test === 'boolean')
        return test && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
            processTree(rulesets, atomizedVariants, path + '/$if', pseudoPrefixes, conditions)
        })
    return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        const cond: TVariants.Condition = {
            type: '$if',
            test
        }
        processTree(rulesets, atomizedVariants, path + '/$if', pseudoPrefixes, [...conditions, cond])
    })
}

export default $if