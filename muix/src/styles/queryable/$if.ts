import { TEngine } from 'reactxx-typings';
import { makeTemporary, processTree } from '../utils/atomize-low';

export const $if = (
    test: boolean | ((outerPar) => boolean),
    ...rulesets: TEngine.Rulesets[]
) => {
    if (!rulesets) return null

    if (typeof test === 'boolean')
        return test && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
            processTree(rulesets, atomizedVariants, path + '/$sif', pseudoPrefixes, conditions)
        })

    return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        const cond: TEngine.Condition = {
            type: '$if',
            test
        }
        processTree(rulesets, atomizedVariants, path + '/$if', pseudoPrefixes, [...conditions, cond])
    })
}

export const $ifelse = (
    test: boolean | ((outerPar) => boolean),
    ifPart: TEngine.Rulesets,
    elsePart: TEngine.Rulesets
) => {
    if (typeof test === 'boolean') {
        if (test)
            return ifPart && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
                processTree(ifPart, atomizedVariants, path + '/$ifelse-true', pseudoPrefixes, conditions)
            })

        return elsePart && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
            processTree(elsePart, atomizedVariants, path + '/$ifelse-false', pseudoPrefixes, conditions)
        })
    }

    return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        if (ifPart) {
            const condTrue: TEngine.Condition = {
                type: '$ifelse-true',
                test
            }
            processTree(ifPart, atomizedVariants, path + '/ifelse-true', pseudoPrefixes, [...conditions, condTrue])
        }
        if (elsePart) {
            const condFalse: TEngine.Condition = {
                type: '$ifelse-false',
                test: outerPar => !test(outerPar)
            }
            processTree(elsePart, atomizedVariants, path + '/ifelse-false', pseudoPrefixes, [...conditions, condFalse])
        }
    })
}
