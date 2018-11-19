import { TSheeter, TCommonStyles, TAtomize } from 'reactxx-typings'
import { processTree, makeTemporary } from '../atomize-low'

const $hot = <T extends TCommonStyles.RulesetNativeIds = 'Text'>(evalProc: (outerPar) => TSheeter.RulesetOrAtomized<T>) => {
    return makeTemporary<T>((atomizedVariants, path, pseudoPrefixes, conditions) => {
        atomizedVariants.push({
            $d$: true,
            evalProc: (outerPar) => {
                const list: TAtomize.Variants = []
                processTree(evalProc(outerPar), list, path + '/$hot', pseudoPrefixes, conditions)
                return list
            }
        } as TAtomize.Deferred)
    })
}

export default $hot