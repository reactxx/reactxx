import { TSheeter, TVariants, TCommonStyles } from 'reactxx-typings'
import { registerVariant } from 'reactxx-sheeter'

export const initVariant$animation = () => registerVariant({
    name: Consts.name,
    toVariantProc,
    testCondition
})

//*********************************************************
//  PRIVATE
//*********************************************************
const enum Consts {
    name = '$animation'
}

declare module 'reactxx-typings' {
    namespace TVariants {
        
        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: AnimationPart<T, R> // record key has format eg. '-640' or '640-1024' or '1024-'
        }
        type AnimationPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            any

        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: AnimationQuery 
        }

        interface AnimationCondition extends Condition {
            type: Consts.name
            opened: boolean
        }
    
        type AnimationQuery = 'opened' | 'closed'    

    }
}

const toVariantProc: TVariants.ToVariantProc<TVariants.AnimationPart> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const testCondition = (cond: TVariants.AnimationCondition, query: TVariants.Query) => {
    return query.$animation === (cond.opened ? 'opened' : 'closed')
}
