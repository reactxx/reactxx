import { TSheeter, TCommonStyles, TTyped, TEngine } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $hot = (evalProc: (outerPar) => TEngine.Ruleset) => {
    return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        atomizedVariants.push({
            $d$: true,
            evalProc: (outerPar) => {
                if (!evalProc) return null
                const list: TEngine.Variants = []
                processTree(evalProc(outerPar), list, path + '/$hot', pseudoPrefixes, conditions)
                return list
            }
        } as TEngine.Deferred)
    })
}

export default $hot