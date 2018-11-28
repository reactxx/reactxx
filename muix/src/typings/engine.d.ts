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
  export type AtomicWeb = string | __dev_AtomicWeb
  export interface AtomicNative {
    propId: string // property name
    value: TNativeRuleValue // propert value
  }

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

  export interface Style {
    $web: {}
    $native: {}
  }

  type ValueOrCreator<T> = T | ((theme) => T)

  export type StyleOrCreator = ValueOrCreator<Style>
  export type RulesetOrCreator = ValueOrCreator<Rulesets>
  export type SheetOrCreator = ValueOrCreator<Sheet>

}
