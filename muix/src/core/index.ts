export * from 'reactxx-sheeter'
export * from 'reactxx-primitives'
export * from 'reactxx-with-styles'

import { TCommonStyles, TSheeter } from 'reactxx-typings'
import { toClassNamesWithQuery } from 'reactxx-sheeter'
import { initVariant$animation, animation_finishPropsCode3 } from 'reactxx-sheet-animation'
import { widthsPipe, getBreakpoints } from 'reactxx-sheet-widths'
import { initVariant$sheetFlags, Consts, getSheetFlags, sheetFlags_finishPropsCode1, sheetFlags_finishPropsCode2 } from 'reactxx-sheet-flags'


type getFlagsAll<R extends TSheeter.Shape = TSheeter.Shape> =
    TSheeter.RulesetNamesAll<R> | getSheetFlags<R> | getBreakpoints<R>

declare module 'reactxx-typings' {

    namespace TVariants {

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: WhenFlagPart<T, R>
        }
        type WhenFlagPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            getFlagsAll<R> extends never ? never :
            PartialRecord<getFlagsAll<R>, TSheeter.RulesetOrAtomized<T, R>>
    }
}

import { initGlobalState } from 'reactxx-with-styles'

export const initCore = () => {
    if (initCoreCalled) return
    initCoreCalled = true

    initVariant$animation()
    initVariant$sheetFlags()
    initGlobalState({

        createPipeline: widthsPipe,

        finishPropsCode: (propsCode, state) => {
            const flags = sheetFlags_finishPropsCode1(state)
            propsCode.toClassNames = rulesets => {
                const sheetQuery = sheetFlags_finishPropsCode2(flags, propsCode)
                const res = toClassNamesWithQuery(sheetQuery, propsCode.theme, rulesets)
                animation_finishPropsCode3(res)
                return res
            }
        }

    })
}
let initCoreCalled = false

initCore()
