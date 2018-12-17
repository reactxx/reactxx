import React from 'react'

declare namespace TEngine {

  type Rulesets = Ruleset | Ruleset[]
  type Ruleset = ToAtomize | Queryables | TempProc | Deferred | StyledComponent

  type ToAtomize = {}

  interface StyledComponent {
    $sdata$: true
  }

  interface Condition {
    type: string
    test?: (outerPar) => boolean
  }
  type Conditions = Condition[]

  type TempProc = (
    (atomizedVariants: QueryableItems, path: string, pseudoPrefixes: string[], conditions: Conditions
    ) => void
  ) & { $t$?: true }

  interface Deferred {
    $d$: true // signature
    evalProc: (outerPar) => QueryableItems
  }

  type Sheet = Record<string, Rulesets>

  // **********************************************
  // CROSSPLATFORM

  // Before toClassNames
  type Queryable = Atomic & { conditions?: Conditions }
  type QueryableItems = Array<Queryable | Deferred>
  interface Queryables extends Array<Queryable> {
    $r$?: true // array signature
  }

  // After toClassNames, before applyLastWindowStrategy
  type Atomic = AtomicWebs | AtomicNatives

  // input to applyLastwinsStrategy
  interface WithConflicts extends Array<Atomic> { $r$?: true }
  // output from applyLastWindowStrategy
  type AtomicLow = AtomicWebLows | AtomicNativeLows

  // after finalizeClassNames
  type AtomicFinal = AtomicWebFinals | AtomicNativeFinals


  // **********************************************
  // NATIVE

  // Queryable item
  type AtomicNative = string | number | __dev_AtomicNative
  type AtomicNatives = Record<string, AtomicNative>

  // after applyLastWindowStrategy
  type AtomicNativeLows = AtomicNatives

  // after finalizeClassNames
  type AtomicNativeFinal = string | number
  type AtomicNativeFinals = Record<string, AtomicNativeFinal>

  interface __dev_AtomicNative {
    value: string | number
    tracePath: string
  }

  // **********************************************
  // WEB

  // Queryable item
  type AtomicWeb = FelaCacheItem | __dev_AtomicWeb
  type AtomicWebs = AtomicWeb[]

  // after applyLastWindowStrategy
  type AtomicWebLow = string | __dev_AtomicWeb
  type AtomicWebLows = AtomicWebLow[]

  // after finalizeClassNames
  type AtomicWebFinals = string

  interface __dev_AtomicWeb {
    tracePath?: string
    cache?: FelaCacheItem
  }
  interface FelaCacheItem {
    type: string
    className: string
    selector: string
    declaration: string
    pseudo: string
    media: string
    support: string
    // LM to FELA hack
    id: number // unique integer ID
    propId?: number
  }


  // **********************************************
  // STYLE, CREATORS, WIDTHS etc.
  // **********************************************

  interface Style {
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

  type StyleOrCreator = ValueOrCreator<Style>
  type RulesetOrCreator = ValueOrCreator<Rulesets>
  type SheetOrCreator = ValueOrCreator<Sheet>

  type ToPlatformAtomizeRuleset = (ruleset: TEngine.ToAtomize, tracePath?: string) => Atomic
  type ApplyLastwinsStrategy = (values: TEngine.WithConflicts) => AtomicLow


}
