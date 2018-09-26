import { TSheeter, TVariants, TCommonStyles } from 'reactxx-typings'
import { registerVariant } from 'reactxx-sheeter'

export const initVariant$mediaq = () => registerVariant({
    name: Consts.name,
    toVariantProc,
    testCondition
})

//*********************************************************
//  PRIVATE
//*********************************************************

const enum Consts {
    name = '$mediaq'
}

declare module 'reactxx-typings' {
    namespace TVariants {
        
        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: MediaQPart<T, R> // record key has format eg. '-640' or '640-1024' or '1024-'
        }
        type MediaQPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            Record<string, TSheeter.RulesetOrAtomized<T, R>>

        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: MediaQuery // actual width
        }
        type MediaQuery = number

        interface MediaQCondition extends Condition {
            type: Consts.name
            start: number | null
            end: number | null
        }

    }
}

const toVariantProc: TVariants.ToVariantProc<TVariants.MediaQPart> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const testCondition = (cond: TVariants.MediaQCondition, query: TVariants.Query) => {
    return typeof query.$mediaq === 'number' && cond.start <= query.$mediaq && cond.end > query.$mediaq
}
