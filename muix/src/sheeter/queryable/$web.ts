import { TEngine } from 'reactxx-typings'
import { processTree, makeTemporary } from '../utils/atomize-low'

const $web = (...rulesets: TEngine.Rulesets[]) => {
    if (!rulesets) return null

    if (window.__TRACE__)
        return makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
            window.isWeb && processTree(rulesets, atomizedVariants, path + '/$web', pseudoPrefixes, conditions)
        })
    else
        return window.isWeb && makeTemporary((atomizedVariants, path, pseudoPrefixes, conditions) => {
            processTree(rulesets, atomizedVariants, path + '/$web', pseudoPrefixes, conditions)
        })
}

export default $web