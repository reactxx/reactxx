import React from 'react'

declare namespace TEngine {

  export type Rulesets = Ruleset | Ruleset[]

  export type Ruleset = ToAtomize | Queryables | TempProc | Deferred

  export type ToAtomize = {}

  export interface Queryables extends Array<Queryable> {
    $r$?: true // array signature
  }


  export interface Queryable extends Array<Atom> {
    conditions?: Conditions
  }
  export interface Condition  {
    type: string
    test?: (outerPar) => boolean
  }
  export type Conditions = Condition[]

  export type TempProc = (
    (atomizedVariants: QueryableItems, path: string, pseudoPrefixes: string[], conditions: Conditions
    ) => void
  ) & { $t$?: true }

  export interface Deferred {
    $d$: true // signature
    evalProc: (outerPar) => QueryableItems
  }
  export type QueryableItems = (Queryable | Deferred)[]

  export type GetPlatformTracePath = (value: Atom) => string

  export interface IsReactXXComponent {
    $c$?: boolean // ReactXX component signature
  }

  export type Sheet = Record<string, Queryables>

  export type NativeStyle = Record<string, TNativeRuleValue>

  export type Atom = AtomicNative | AtomicWeb

  export interface AtomicNative {
    propId: string // property name
    value: TNativeRuleValue // propert value
  }

  export interface __dev_AtomicWeb {
    tracePath?: string
    cache?: FelaWebCacheItem
  }
  export interface FelaWebCacheItem {
    type: string
    className: string
    id: number // unique integer ID
    propId?: number
    selector: string
    declaration: string
    pseudo: string
    media: string
    support: string
  }
  export type TNativeRuleValue = string | number | __dev_AtomicNative
  export interface __dev_AtomicNative {
    value: string | number
    tracePath: string
  }

  //********* WEB
  // Queryable item
  export type AtomicWeb = FelaWebCacheItem | __dev_AtomicWeb
  export type AtomicWebs = AtomicWeb[]
  // after applyLastWindowStrategy
  export type AtomicWebLow = string | __dev_AtomicWeb 
  export type AtomicWebsLow = AtomicWebLow[]
  // after finalizeClassNames
  export type AtomicWebFinal = string
  // for tracing: can trace or before or after applyLastWindowStrategy
  export type AtomicWebAll = string | FelaWebCacheItem | __dev_AtomicWeb 
  export type AtomicWebAlls = AtomicWebAll[]

  //********* BOTH
  export type AtomicArrayLow = AtomicWebsLow | AtomicNativeLow
  export type AtomicArrayAll = AtomicWebAlls | AtomicNativeLow
  export type AtomicFinal = AtomicWebFinal | AtomicNativeLow

  export type AtomicNatives = AtomicNative[]

  export type AtomicNativeLow = Record<string, TNativeRuleValue>

  export interface Style {
    $web: {}
    $native: {}
  }

  type WidthInterval = number | [number, number]
  interface WidthsQuery { 
    $widths?: {
        actWidth: number
        breakpoints?: Set<number>
    }
  }


  type ValueOrCreator<T> = T | ((theme) => T)

  export type StyleOrCreator = ValueOrCreator<Style>
  export type RulesetOrCreator = ValueOrCreator<Rulesets>
  export type SheetOrCreator = ValueOrCreator<Sheet>

  export type ToPlatformAtomizeRuleset = (ruleset: {}, tracePath?: string) => Queryable
  export type ApplyLastwinsStrategy = (values: QueryableItems | AtomicWebs | AtomicNatives) => AtomicArrayLow
  

}
