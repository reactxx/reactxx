import { TAtomize, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $ifelse = (
    test: (outerPar) => boolean,
    ifPart: TAtomize.Ruleset,
    elsePart: TAtomize.Ruleset
) => {
    return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        if (ifPart) {
            const condTrue: TVariants.Condition = {
                type: '$ifelse-true',
                test
            }
            processTree(ifPart, atomizedVariants, path + '/$ifelse-true', pseudoPrefixes, [...conditions, condTrue])
        }
        if (elsePart) {
            const condFalse: TVariants.Condition = {
                type: '$ifelse-false',
                test: outerPar => !test(outerPar)
            }
            processTree(elsePart, atomizedVariants, path + '/$ifelse-false', pseudoPrefixes, [...conditions, condFalse])
        }
    })
}

export default $ifelse