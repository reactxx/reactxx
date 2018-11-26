import { TSheeter, TCommonStyles, TTyped, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $hot = <TPar extends {} = {}, T extends TCommonStyles.RulesetIds = 'Text'>(evalProc: (outerPar: TPar) => TSheeter.RulesetOrAtomized<T>) => {
    return makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
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