import { renderer } from 'reactxx-fela'
import { TAtomize } from 'reactxx-typings'

export const toPlatformAtomizeRuleset: TAtomize.ToPlatformAtomizeRuleset = renderer.renderRuleEx

export const getPlatformTracePath: TAtomize.GetPlatformTracePath = (value: TAtomize.AtomicWeb) =>
    typeof value === 'string' ? renderer.trace[value] : JSON.stringify(value)
