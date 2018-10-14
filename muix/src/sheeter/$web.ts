import { renderer, dumpAtomized } from 'reactxx-fela'
import { TAtomize } from 'reactxx-typings'
import { applyLastwinsStrategy } from './reacts/$web'

export const platform: TAtomize.ToPlatformAtomizeRuleset = {
    toPlatformAtomizeRuleset: (ruleset, tracePath) => renderer.renderRuleEx(ruleset, tracePath),
    dumpAtomized,
    applyLastwinsStrategy
}
