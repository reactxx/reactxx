import { TSheeter, TCompiler, TCommonStyles } from '.'

export namespace TRulesetConditions {

  export type CompileProc = (
    list: TCompiler.RulesetList,
    ruleset: RulesetConditionPart | WhenUsedPart | MediaQPart | AnimationPart | ConditionalPart, 
    path: string,
    pseudoPrefixes: string[],
    conditions: Conditions,
    rulesetToQueue?: RulesetConditionPart
  ) => void

  //*********************************************************
  //  RULESET EXTENSION
  //*********************************************************

  export interface RulesetConditionPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
    $whenUsed?: WhenUsedPart<R>
    $mediaq?: MediaQPart<T, R> // record key has format eg. '-640' or '640-1024' or '1024-'
    $animation?: any
    $conditional?: ConditionalPart
  }

  export type WhenUsedPart<R extends TSheeter.Shape = TSheeter.Shape> = TSheeter.PartialSheet<R>
  export type MediaQPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> = Record<string, TSheeter.Ruleset<T, R>>
  export type AnimationPart = any
  export type ConditionalPart = ConditionalPartRuleset[]
  export type ConditionalProc = (props, theme, state) => boolean
  export type ConditionalPartRuleset = TSheeter.Ruleset & {$condition: ConditionalProc}

  //*********************************************************
  //  CONDITIONS
  //*********************************************************

  export type Conditions = ConditionAll[]
  export type ConditionAll = WhenUsedCondition | MediaQCondition | AnimationCondition | ConditionalCondition
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
  export interface ConditionalCondition extends Condition {
    type: 'conditional'
    condition: ConditionalProc
  }

  export type ConditionTypes = 'whenUsed' | 'mediaq' | 'animation' | 'conditional'

  //*********************************************************
  //  QUERY
  //*********************************************************

  export interface Query { // 
    whenUsed?: WhenUsedQuery // map of used ruleset names
    mediaq?: MediaQQuery // actual width
    animation?: AnimationQuery // animation state: opened x closed
    conditionalQuery?: ConditionalQuery
  }

  export type WhenUsedQuery = Record<string, boolean>

  export type MediaQQuery = number

  export type AnimationQuery = 'opened' | 'closed'

  export type ConditionalQuery = {
    props
    theme
    state
  }

}