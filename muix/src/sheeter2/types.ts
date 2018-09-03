//****************************
// TYPINGS
//****************************

export type RulesetCompiler = (ruleset: TSheeterSource.Rules<string>) => TSheeterCompiled.Fixed
export type GetPropIdFromValue = (value: TSheeterCompiled.Value) => string

//********** SOURCE

export namespace TSheeterSource {

  export type Sheet<Keys extends string> = Record<Keys, RulesTreeRoot<Keys>>

  export type PartialSheet<Keys extends string> = PartialRecord<Keys, RulesTree<Keys>>

  export type RulesTree<Keys extends string> = Rules<Keys> & RulesAddIn<Keys>
  export type RulesTreeRoot<Keys extends string> = Rules<Keys> & RulesRoot<Keys>

  export interface Rules<Keys extends string> {
    // e.g. "color: 'red'"  or "':hover': { color: 'blue' }" or "':hover': { $mediaq: { '-640': {color: green} } }"
    [ruleName: string]: TValue | RulesTree<Keys>
  }

  export interface RulesRoot<Keys extends string> extends RulesAddIn<Keys> {
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
  export type TValue = number | string
}
export namespace TSheeterCompiled2 {

  export type Queue = QueueItem[]
  export interface QueueItem {
    rules?: Values
    rulesTrace?: {}
    path: string // <rulesetName>/before/:hover/whenUsed/<rulesetName>
    conditions?: Conditions
  }

  export type Conditions = Condition[]
  export interface Condition {
    type: ConditionTypes
  }
  export interface WhenUsedCondition extends Condition {
    rulesetName: string
  }
  export interface MediaQCondition extends Condition {
    start: number | null
    end: number | null
  }
  export interface AnimationCondition extends Condition {
    opened:boolean
  }

  export type ConditionTypes = 'whenUsed' | 'mediaq' | 'animation'

  export type Values = Value[] // last value in array (with the same propId) wins!

  export type Value = ValueNative | ValueWeb
  export type ValueWeb = string // fela class name. propId's are cached, propId = fela.renderer.propIdCache[valueWeb]
  export interface ValueNative {
    propId: string // property name
    value: string | number
  }
}

export namespace TSheeterCompiled {

  export interface RulesTree {
    rulesetName?: string // for top level rulesets: its name (for WhenUsed magic)
    fixed?: Fixed
    variable?: Variable
    fixedToCompile?: {} // for DEV_MODE: temporary ruleset for index/rulesetCompiler
  }

  // fixed  
  export type Fixed = Value[] // last value in array (with the same propId) wins!

  export type Value = ValueNative | ValueWeb
  export type ValueWeb = string // fela class name. propId's are cached, propId = fela.renderer.propIdCache[valueWeb]
  export interface ValueNative {
    propId: string // property name
    value: string | number
  }

  // variable value
  export interface Variable {
    whenUsed?: WhenUsed
    mediaq?: MediaQ
    animation?: Animation
  }

  export interface WhenUsed { [rulesetName: string]: RulesTree }

  export type MediaQ = MediaQInterval[]

  export interface MediaQInterval {
    start: number | null
    end: number | null
    rules: RulesTree
  }

  export interface Animation {
    opened?: RulesTree
    closed?: RulesTree
  }

  export interface Query {
    whenUsed?: WhenUsedQuery
    mediaq?: MediaQQuery
    animation?: AnimationQuery
  }

  export type WhenUsedQuery = Record<string, boolean>

  export type MediaQQuery = number

  export type AnimationQuery = 'opened' | 'closed'

}

