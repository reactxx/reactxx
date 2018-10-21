import { renderer, dumpAtomized } from 'reactxx-fela'
import { TAtomize } from 'reactxx-typings'
import { applyLastwinsStrategy, finalClassNameStep, createElement } from './reacts/$web'

export const platform: TAtomize.Platform = {
    toPlatformAtomizeRuleset: (ruleset, tracePath) => renderer.renderRuleEx(ruleset, tracePath),
    dumpAtomized,
    applyLastwinsStrategy,
    finalClassNameStep,
    createElement
}
