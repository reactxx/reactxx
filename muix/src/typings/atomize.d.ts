import { TNativeRuleValue, TSheeter, TVariants } from './index'
import { TComponents } from './components';
import { TWithStyles } from './with-styles';

declare namespace TAtomize {

  export type Source = Item | Item[]

  export interface TempCtx {
    atomizedVariants: TAtomize.Variants, path: string,
    pseudoPrefixes: string[], conditions: TVariants.Conditions
    isInPseudo?: boolean
  }
  export type TempProc = (
    (atomizedVariants: TAtomize.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions
    ) => void
  ) & { $t$?: true }

  export type Item = ToAtomize | Ruleset | TempProc | Deferred
  export type ToAtomize = {}

  export interface Ruleset extends Array<Variant> {
    $r$?: true // array signature
  }
  export interface Deferred {
    $d$: true // signature
    getToAtmize: (pars) => ToAtomize
  }
  export interface Variant extends Array<Atomic> {
    conditions?: TVariants.Conditions
  }
  export type Variants = (Variant | Deferred)[]

  export type GetPlatformTracePath = (value: Atomic) => string

  export interface IsReactXXComponent {
    $c$?: boolean // ReactXX component signature
  }

  export type Sheet<R extends TSheeter.Shape = TSheeter.Shape> = { [P in TSheeter.RulesetNamesAll<R>]: Ruleset }

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

  //export type Ruleset = AtomizedRuleset | AtomicArray

}
