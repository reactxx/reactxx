//****************************
// TYPINGS
//****************************

export type RulesetCompiler = (ruleset: TSheeterSource.Rules<string>) => TSheeterCompiled.Values
export type NormalizeClassNames = (value: TSheeterCompiled.Values) => TSheeterCompiled.PlatformValues

export interface Query { // 
  whenUsed?: WhenUsedQuery // map of used ruleset names
  mediaq?: MediaQQuery // actual width
  animation?: AnimationQuery // animation state: opened x closed
}

export type WhenUsedQuery = Record<string, boolean>

export type MediaQQuery = number

export type AnimationQuery = 'opened' | 'closed'

export type TValue = number | string

export type Ruleset<Keys extends string = string> = TSheeterSource.Ruleset<Keys> | TSheeterCompiled.Ruleset

export type ClassName = TSheeterSource.Ruleset | TSheeterCompiled.Ruleset | TSheeterCompiled.Values


  //********** SOURCE

  export namespace TSheeterSource {

    export type Sheet<Keys extends string> = Record<Keys, Ruleset<Keys>>
    export type Ruleset<Keys extends string = string> = Rules<Keys> & RulesRoot<Keys>

    export type PartialSheet<Keys extends string> = PartialRecord<Keys, RulesTree<Keys>>

    export type RulesTree<Keys extends string> = Rules<Keys> & RulesAddIn<Keys>

    export interface Rules<Keys extends string> {
      // e.g. "color: 'red'"  or "':hover': { color: 'blue' }" or "':hover': { $mediaq: { '-640': {color: green} } }"
      [ruleName: string]: TValue | RulesTree<Keys>
    }

    export interface RulesRoot<Keys extends string> extends RulesAddIn<Keys> {
      name?: string
      $before?: RulesTree<Keys>
      $web?: RulesTree<Keys>
      $native?: RulesTree<Keys>
      $after?: RulesTree<Keys>
    }
    export interface RulesAddIn<Keys extends string> {
      $whenUsed?: PartialSheet<Keys>
      $mediaq?: Record<string, RulesTree<Keys>> // record key has format eg. '-640' or '640-1024' or '1024-'
      $animation?: any
    }
  }

export namespace TSheeterCompiled {

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

