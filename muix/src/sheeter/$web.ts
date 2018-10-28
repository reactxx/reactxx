import { renderer, dumpAtomized } from 'reactxx-fela'
import { TVariants } from 'reactxx-typings'
import { applyLastwinsStrategy, finalizeClassName, createElement } from './reacts/$web'

export const platform: TVariants.Platform = {
    toPlatformAtomizeRuleset: (ruleset, tracePath) => renderer.renderRuleEx(ruleset, tracePath),
    dumpAtomized,
    applyLastwinsStrategy,
    finalizeClassName,
    createElement
}
