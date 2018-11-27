import { TSheeter, TCommonStyles, TTyped, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $hot = (evalProc: (outerPar) => TAtomize.Ruleset) => {
    return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        atomizedVariants.push({
            $d$: true,
            evalProc: (outerPar) => {
                if (!evalProc) return null
                const list: TAtomize.Variants = []
                processTree(evalProc(outerPar), list, path + '/$hot', pseudoPrefixes, conditions)
                return list
            }
        } as TAtomize.Deferred)
    })
}

export default $hot