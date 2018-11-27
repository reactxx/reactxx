import { TEngine, TVariants } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $sif = (
    test: boolean,
    ...rulesets: TEngine.Rulesets[]
) => {
    return rulesets && test && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        processTree(rulesets, atomizedVariants, path + '/$sif', pseudoPrefixes, conditions)
    })
}

const $sifelse = (
    test: boolean,
    ifPart: TEngine.Rulesets,
    elsePart: TEngine.Rulesets
) => {
    if (ifPart && test)
        return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
            processTree(ifPart, atomizedVariants, path + '/$sifelse-true', pseudoPrefixes, conditions)
        })
    if (elsePart && !test)
        return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
            processTree(ifPart, atomizedVariants, path + '/$sifelse-false', pseudoPrefixes, conditions)
        })
}

export { $sif, $sifelse }
