import { TSheeter, TCommonStyles, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

const $ifelse = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(
    test: (outerPar, innerPar) => boolean,
    ifPart: TSheeter.RulesetOrAtomized<T>,
    elsePart: TSheeter.RulesetOrAtomized<T>
) => {
    return makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        if (ifPart) {
            const condTrue = {
                type: '$ifelse-true',
                test: outerPar => test(outerPar, null)
            }
            processTree(ifPart, atomizedVariants, path + '/$ifelse-true', pseudoPrefixes, [...conditions, condTrue])
        }
        if (elsePart) {
            const condFalse = {
                type: '$ifelse-false',
                test: outerPar => !test(outerPar, null)
            }
            processTree(elsePart, atomizedVariants, path + '/$ifelse-false', pseudoPrefixes, [...conditions, condFalse])
        }
    })
}

export default $ifelse