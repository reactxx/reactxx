import { TEngine } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $native = (...rulesets: TEngine.Rulesets[]) => {
    return rulesets && !window.isWeb && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        processTree(rulesets, atomizedVariants, path + '/$native', pseudoPrefixes, conditions)
    })
}

export default $native