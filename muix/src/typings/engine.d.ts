import React from 'react'

declare namespace TEngine {

  export type Rulesets = Ruleset | Ruleset[]
  export type Ruleset = ToAtomize | Queryables | TempProc | Deferred

  export type ToAtomize = {}

  export interface Condition {
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

  export interface IsReactXXComponent {
    $c$?: boolean // ReactXX component signature
  }

  export type Sheet = Record<string, Queryables>

  // **********************************************
  // CROSSPLATFORM

  // Before toClassNames
  export type Queryable = Atomic & { conditions?: Conditions }
  export type QueryableItems = Array<Queryable | Deferred>
  export interface Queryables extends Array<Queryable> {
    $r$?: true // array signature
  }

  // After toClassNames, before applyLastWindowStrategy
  export type Atomic = AtomicWebs | AtomicNatives

  // input to applyLastwinsStrategy
  export interface WithConflicts extends Array<Atomic> { $r$?: true }
  // output from applyLastWindowStrategy
  export type AtomicLow = AtomicWebLows | AtomicNativeLows

  // after finalizeClassNames
  export type AtomicFinal = AtomicWebFinals | AtomicNativeFinals


  // **********************************************
  // NATIVE

  // Queryable item
  export type AtomicNative = string | number | __dev_AtomicNative
  export type AtomicNatives = Record<string, AtomicNative>
  // after applyLastWindowStrategy
  export type AtomicNativeLows = AtomicNatives
  // after finalizeClassNames
  export type AtomicNativeFinal = string | number
  export type AtomicNativeFinals = Record<string, AtomicNativeFinal>

  export interface __dev_AtomicNative {
    value: string | number
    tracePath: string
  }

  // **********************************************
  // WEB

  // Queryable item
  export type AtomicWeb = FelaWebCacheItem | __dev_AtomicWeb
  export type AtomicWebs = AtomicWeb[]
  // after applyLastWindowStrategy
  export type AtomicWebLow = string | __dev_AtomicWeb
  export type AtomicWebLows = AtomicWebLow[]
  // after finalizeClassNames
  export type AtomicWebFinals = string

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


  // **********************************************
  // STYLE, CREATORS, WIDTHS etc.
  // **********************************************

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

  export type ToPlatformAtomizeRuleset = (ruleset: TEngine.ToAtomize, tracePath?: string) => Atomic
  export type ApplyLastwinsStrategy = (values: TEngine.WithConflicts) => AtomicLow


}
