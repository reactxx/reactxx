import Fela from 'reactxx-fela'
import { assignPlatform, platform } from 'reactxx-sheeter'
import { applyLastwinsStrategy, finalizeClassName, createElement } from './reacts/$web'

export const init = () => {
    Fela.initFela$Web(platform)
    assignPlatform({
        toPlatformAtomizeRuleset: (ruleset, tracePath) => platform.renderer.renderRuleEx(ruleset, tracePath),
        dumpAtomized: Fela.dumpAtomized,
        applyLastwinsStrategy,
        finalizeClassName,
        createElement
    })
}
