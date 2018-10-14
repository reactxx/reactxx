import { renderer, dumpAtomized } from 'reactxx-fela'
import { TAtomize } from 'reactxx-typings'

export const toPlatformAtomizeRuleset: TAtomize.ToPlatformAtomizeRuleset = (ruleset: {}, tracePath?: string) => renderer.renderRuleEx(ruleset, tracePath)

// export const getPlatformTracePath: TAtomize.GetPlatformTracePath = (value: TAtomize.AtomicWeb) => 
//     typeof value === 'string' ? '' : (value as TAtomize.__dev_AtomicWeb).value || JSON.stringify(value)
    //_.value //renderer.trace[value] : JSON.stringify(value
    

export { dumpAtomized }

