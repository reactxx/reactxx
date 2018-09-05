import { TSheeter } from './sheeter'

//****************************
// TYPINGS
//****************************

export type RulesetCompiler = (ruleset: TSheeter.RulesetInner) => TCompiler.Values
export type NormalizeClassNames = (value: TCompiler.Values) => TCompiler.PlatformValues

export interface Query { // 
  whenUsed?: WhenUsedQuery // map of used ruleset names
  mediaq?: MediaQQuery // actual width
  animation?: AnimationQuery // animation state: opened x closed
}

export type WhenUsedQuery = Record<string, boolean>

export type MediaQQuery = number

export type AnimationQuery = 'opened' | 'closed'

export type TValue = number | string

// export type Ruleset<Keys extends string = string> = TSheeterSource.Ruleset | TCompiler.Ruleset

// export type ClassName = TSheeterSource.Ruleset | TCompiler.Ruleset | TCompiler.Values


//********** SOURCE

export namespace TSheeterSource {

  export type Sheet = Record<string, Ruleset>
  export type Ruleset<Keys extends string = string> = RulesetCommon & RulesetLow

  export type PartialSheet = PartialRecord<string, RulesetInner>

  export type RulesetInner = RulesetCommon & RulesetInnerLow

  export interface RulesetCommon {
    // e.g. "color: 'red'"  or "':hover': { color: 'blue' }" or "':hover': { $mediaq: { '-640': {color: green} } }"
    [ruleName: string]: TValue | RulesetInner
  }

  export interface RulesetLow extends RulesetInnerLow {
    name?: string
    $before?: RulesetInner
    $web?: RulesetInner
    $native?: RulesetInner
    $after?: RulesetInner
  }
  export interface RulesetInnerLow {
    $whenUsed?: PartialSheet
    $mediaq?: Record<string, RulesetInner> // record key has format eg. '-640' or '640-1024' or '1024-'
    $animation?: any
  }
}

export namespace TCompiler {

  export const TypedInterfaceProp = '``'

  export enum TypedInterfaceTypes {
    compiled = 'c'/*compiled*/,
    nativeValue = 'n' /*Native value*/
  }

  export interface TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes
  }

  export type Sheet<Keys extends string = string> = Record<Keys, Ruleset>

  export interface Ruleset extends TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes.compiled
    name: string
    list: RulesetList
  }
  export type RulesetList = RulesetListItem[]
  export interface RulesetListItem {
    rules: Values // class names for web, propId-propValue for native
    rulesTrace?: {} // for DEV_MODE: ruleset source
    path?: string // for DEV_MODE: ruleset origin path
    conditions?: Conditions // conditions (when is ruleset used)
  }

  export type Conditions = ConditionAll[]
  export type ConditionAll = WhenUsedCondition | MediaQCondition | AnimationCondition
  export interface Condition {
    type: ConditionTypes
  }
  export interface WhenUsedCondition extends Condition {
    type: 'whenUsed'
    rulesetName: string
  }
  export interface MediaQCondition extends Condition {
    type: 'mediaq'
    start: number | null
    end: number | null
  }
  export interface AnimationCondition extends Condition {
    type: 'animation'
    opened: boolean
  }

  export type ConditionTypes = 'whenUsed' | 'mediaq' | 'animation'

  export type Values = Value[] // last value in array (with the same propId) wins!

  export type Value = ValueNative | ValueWeb
  export type ValueWeb = string // fela class name. propId's are cached (propId = fela.renderer.propIdCache[valueWeb])
  export interface ValueNative extends TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes.nativeValue
    propId: string // property name
    value: TValue // propert value
  }

  export type PlatformValues = PlatformValuesWeb | PlatformValuesNative
  export type PlatformValuesWeb = string
  export type PlatformValuesNative = Record<string, string | number>
}

