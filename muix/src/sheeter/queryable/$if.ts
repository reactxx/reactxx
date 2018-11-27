import { TEngine } from 'reactxx-typings';
import { makeTemporary, processTree } from '../utils/atomize-low';

const $if = (
    test: (outerPar) => boolean,
    ...rulesets: TEngine.Rulesets[]
) => {
    return rulesets && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        const cond: TEngine.Condition= {
            type: '$if',
            test
        }
        processTree(rulesets, atomizedVariants, path + '/$if', pseudoPrefixes, [...conditions, cond])
    })
}

const $ifelse = (
    test: (outerPar) => boolean,
    ifPart: TEngine.Rulesets,
    elsePart: TEngine.Rulesets
) => {
    return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        if (ifPart) {
            const condTrue: TEngine.Condition= {
                type: '$ifelse-true',
                test
            }
            processTree(ifPart, atomizedVariants, path + '/$ifelse-true', pseudoPrefixes, [...conditions, condTrue])
        }
        if (elsePart) {
            const condFalse: TEngine.Condition= {
                type: '$ifelse-false',
                test: outerPar => !test(outerPar)
            }
            processTree(elsePart, atomizedVariants, path + '/$ifelse-false', pseudoPrefixes, [...conditions, condFalse])
        }
    })
}

export { $if, $ifelse };

