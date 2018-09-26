import { TSheeter, TAtomize, TCommonStyles } from 'reactxx-typings'

export namespace TVariants {

  export type ToVariantProc = (
    list: TAtomize.Variants,
    ruleset: VariantPart | WhenFlagPart | MediaQPart | AnimationPart,
    path: string,
    pseudoPrefixes: string[],
    conditions: Conditions,
    rulesetToQueue?: VariantPart
  ) => void

  //*********************************************************
  //  RULESET EXTENSION
  //*********************************************************

  export interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
    $whenFlag?: WhenFlagPart<T, R>
    $mediaq?: MediaQPart<T, R> // record key has format eg. '-640' or '640-1024' or '1024-'
    $animation?: AnimationPart
  }

  export type WhenFlagPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> = {
    [P in TSheeter.getFlags<R>]?: TSheeter.RulesetOrAtomized<T, R>
  }
  
  export type MediaQPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
    Record<string, TSheeter.RulesetOrAtomized<T, R>>

  export type AnimationPart = any


  //*********************************************************
  //  CONDITIONS
  //*********************************************************

  export type Conditions = ConditionAll[]
  export type ConditionAll = WhenFlagCondition | MediaQCondition | AnimationCondition
  export interface Condition {
    type: ConditionTypes
  }
  export interface WhenFlagCondition extends Condition {
    type: 'whenFlag'
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

  export type ConditionTypes = 'whenFlag' | 'mediaq' | 'animation'

  //*********************************************************
  //  QUERY
  //*********************************************************

  export interface Query<R extends TSheeter.Shape = TSheeter.Shape> { // 
    whenFlag?: WhenFlagQuery<R> // map of used ruleset names
    mediaq?: MediaQuery // actual width
    animation?: AnimationQuery // animation state: opened x closed
  }

  export type WhenFlagQuery<R extends TSheeter.Shape = TSheeter.Shape> = PartialRecord<TSheeter.getFlags<R>, boolean>

  export type MediaQuery = number

  export type AnimationQuery = 'opened' | 'closed'


}