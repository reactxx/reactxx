import { TSheeter, TCommonStyles, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $ifelse = <TPar extends {} = {}, T extends TCommonStyles.RulesetIds = 'Text'>(
    test: (outerPar: TPar) => boolean,
    ifPart: TSheeter.RulesetOrAtomized<T>,
    elsePart: TSheeter.RulesetOrAtomized<T>
) => {
    return makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
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