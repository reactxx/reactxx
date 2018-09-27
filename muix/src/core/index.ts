export * from 'reactxx-sheeter'
export * from 'reactxx-primitives'
export * from 'reactxx-with-styles'

import { TCommonStyles, TSheeter } from 'reactxx-typings'
import { initVariant$animation } from 'reactxx-sheet-animation'
import { widthsPipe, getBreakpoints } from 'reactxx-sheet-widths'
import { initVariant$sheetFlags, Consts, getSheetFlags, finishPropsCode } from 'reactxx-sheet-flags'


export type getFlagsAll<R extends TSheeter.Shape = TSheeter.Shape> =
    TSheeter.RulesetNamesAll<R> | getSheetFlags<R> | getBreakpoints<R>

declare module 'reactxx-typings' {

    namespace TVariants {

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: WhenFlagPart<T, R>
        }
        type WhenFlagPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            getFlagsAll<R> extends never ? TSheeter.FakeInterface :
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
        finishPropsCode: finishPropsCode
    })
}
let initCoreCalled = false

initCore()
