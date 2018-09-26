export { TCommonStyles } from './common-styles'
export { TAtomize } from './atomize'
export { TSheeter } from './sheeter'
export { TComponents } from './components'
export { TTheme } from './themer'
export { TWithStyles } from './with-styles'

export type TValue = number | string

import { TSheeter, TAtomize, TCommonStyles } from './index'

export namespace TVariants {

    type ToVariantProc = (
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

    interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
        $whenFlag?: WhenFlagPart<T, R>
        $mediaq?: MediaQPart<T, R> // record key has format eg. '-640' or '640-1024' or '1024-'
        $animation?: AnimationPart
    }

    type WhenFlagPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        TSheeter.getFlags<R> extends never ? TSheeter.FakeInterface : {
            [P in TSheeter.getFlags<R>]?: TSheeter.RulesetOrAtomized<T, R>
        }

    type MediaQPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        Record<string, TSheeter.RulesetOrAtomized<T, R>>

    type AnimationPart = any


    //*********************************************************
    //  CONDITIONS
    //*********************************************************

    type Conditions = ConditionAll[]
    type ConditionAll = WhenFlagCondition | MediaQCondition | AnimationCondition
    interface Condition {
        type: ConditionTypes
    }
    interface WhenFlagCondition extends Condition {
        type: 'whenFlag'
        rulesetName: string
    }
    interface MediaQCondition extends Condition {
        type: 'mediaq'
        start: number | null
        end: number | null
    }
    interface AnimationCondition extends Condition {
        type: 'animation'
        opened: boolean
    }

    type ConditionTypes = 'whenFlag' | 'mediaq' | 'animation'

    //*********************************************************
    //  QUERY
    //*********************************************************

    interface Query<R extends TSheeter.Shape = TSheeter.Shape> { // 
        whenFlag?: WhenFlagQuery<R> // map of used ruleset names
        mediaq?: MediaQuery // actual width
        animation?: AnimationQuery // animation state: opened x closed
    }

    type WhenFlagQuery<R extends TSheeter.Shape = TSheeter.Shape> = keyof TSheeter.getFlags<R> extends never ? TSheeter.FakeInterface :
        PartialRecord<TSheeter.getFlags<R>, boolean>

    type MediaQuery = number

    type AnimationQuery = 'opened' | 'closed'

}