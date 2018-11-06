import Fela from 'reactxx-fela'
import { assignPlatform, platform } from 'reactxx-sheeter'
import { applyLastwinsStrategy, finalizeClassName, createElement } from './reacts/$web'

export const init = () => {
    Fela.initFela$Web(platform)
    // save 
    //renderRuleEx = platform.renderer.renderRuleEx
    assignPlatform({
        toPlatformAtomizeRuleset: platform.renderer.renderRuleEx,
        dumpAtomized: Fela.dumpAtomized,
        applyLastwinsStrategy,
        finalizeClassName,
        createElement
    })
}

//let renderRuleEx
