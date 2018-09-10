import { TSheeter, TCompiler, TCommonStyles } from '../index-d'

export namespace TRulesetConditions {
 
  export type CompileProc = (
    list: TCompiler.RulesetList,
    ruleset: ConditionalPart | WhenUsedPart | MediaQPart | AnimationPart, 
    path: string,
    pseudoPrefixes: string[],
    conditions: Conditions,
    rulesetToQueue?: ConditionalPart
  ) => void

  //*********************************************************
  //  RULESET EXTENSION
  //*********************************************************

  export interface ConditionalPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
    $whenUsed?: WhenUsedPart<R>
    $mediaq?: MediaQPart<T, R> // record key has format eg. '-640' or '640-1024' or '1024-'
    $animation?: AnimationPart
  }

  export type WhenUsedPart<R extends TSheeter.Shape = TSheeter.Shape> = { [p in WhenUsedKeys<R>]?: TSheeter.Ruleset }
  export type WhenUsedKeys<R extends TSheeter.Shape> = TSheeter.RulesetNamesAll<R> | TSheeter.getFlags<R>

  export type MediaQPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> = Record<string, TSheeter.Ruleset<T, R>>

  export type AnimationPart = any
  
  //*********************************************************
  //  CONDITIONS
  //*********************************************************

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

  export type ConditionTypes = 'whenUsed' | 'mediaq' | 'animation' | 'conditional'

  //*********************************************************
  //  QUERY
  //*********************************************************

  export interface Query<R extends TSheeter.Shape = TSheeter.Shape> { // 
    whenUsed?: WhenUsedQuery<R> // map of used ruleset names
    mediaq?: MediaQQuery // actual width
    animation?: AnimationQuery // animation state: opened x closed
  }

  export type WhenUsedQuery<R extends TSheeter.Shape = TSheeter.Shape> = Record<WhenUsedKeys<R>, boolean>

  export type MediaQQuery = number

  export type AnimationQuery = 'opened' | 'closed'


}