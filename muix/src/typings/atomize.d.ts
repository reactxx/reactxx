import { TVariants } from './index'

declare namespace TEngine {

  export type Ruleset = RulesetItem | RulesetItem[]

  export type RulesetItem = ToAtomize | AtomizedRuleset | TempProc | Deferred

  export interface TempCtx {
    atomizedVariants: Variants
    path: string,
    pseudoPrefixes: string[]
    conditions: TVariants.Conditions
    isInPseudo?: boolean
  }
  export type TempProc = (
    (atomizedVariants: Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions
    ) => void
  ) & { $t$?: true }

  export type ToAtomize = {}

  export interface AtomizedRuleset extends Array<Variant> {
    $r$?: true // array signature
  }
  export interface Deferred {
    $d$: true // signature
    evalProc: (outerPar) => Variants
  }
  export interface Variant extends Array<Atomic> {
    conditions?: TVariants.Conditions
  }
  export type Variants = (Variant | Deferred)[]

  export type GetPlatformTracePath = (value: Atomic) => string

  export interface IsReactXXComponent {
    $c$?: boolean // ReactXX component signature
  }

  export type Sheet = Record<string, AtomizedRuleset>

  export type NativeStyle = Record<string, TNativeRuleValue>

  export type Atomic = AtomicNative | AtomicWeb
  export interface __dev_AtomicWeb {
    tracePath?: string
    cache?: __dev_WebCache
  }
  export interface __dev_WebCache {
    type: string
    className: string
    selector: string
    declaration: string
    pseudo: string
    media: string
    support: string
  }
  export type AtomicWeb = string | __dev_AtomicWeb
  export interface AtomicNative {
    propId: string // property name
    value: TNativeRuleValue // propert value
  }
  export type TNativeRuleValue = string | number | __dev_AtomicNative
  export interface __dev_AtomicNative {
    value: string | number
    tracePath: string
  }

  export type AtomicNatives = AtomicNative[] //& AtomicArrayExtension
  export type AtomicWebs = AtomicWeb[] //& AtomicArrayExtension

  export type AtomicArrayLow = AtomicWebsLow | AtomicNativeLow
  export type AtomicWebsLow = AtomicWeb[]
  export type AtomicNativeLow = Record<string, TNativeRuleValue>

  type ValueOrCreator<T> = T | ((theme) => T)

  export type RulesetOrCreator = ValueOrCreator<Ruleset>
  export type SheetOrCreator = ValueOrCreator<Sheet>

}
