import { TEngine } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $web = (...rulesets: TEngine.Ruleset[]) => {
    return rulesets && window.isWeb && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
        processTree(rulesets, atomizedVariants, path + '/$web', pseudoPrefixes, conditions)
    })
}

export default $web