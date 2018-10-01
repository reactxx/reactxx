export * from 'reactxx-sheeter'
export * from 'reactxx-primitives'
export * from 'reactxx-with-styles'

import { TCommonStyles, TSheeter, TVariants } from 'reactxx-typings'
import { toClassNamesWithQuery } from 'reactxx-sheeter'
import { initVariant$transition, transition_finishPropsCode3, TTransition } from 'reactxx-sheet-transition'
import { widthsPipe, getBreakpoints } from 'reactxx-sheet-widths'
import { initVariant$sheetFlags, Consts, getSheetFlags, sheetFlags_finishPropsCode1, sheetFlags_finishPropsCode2 } from 'reactxx-sheet-flags'

// workaround due to https://github.com/Microsoft/TypeScript/issues/27448
export interface TSBugHelper<R extends TSheeter.Shape> {
    rulesetView?: TSheeter.Ruleset<'View', R>
    rulesetText?: TSheeter.Ruleset<'Text', R>
    transitionView?: TTransition.Transition<'View', R>
    transitionText?: TTransition.Transition<'Text', R>
    transitionGroupView?: TTransition.TransitionGroup<'View', R>
    transitionGroupText?: TTransition.TransitionGroup<'Text', R>
    transitionNativeView?: TTransition.RulesetNative<'View'>
    transitionNativeText?: TTransition.RulesetNative<'Text'>
    sheetFlagsView?: TVariants.WhenFlagPart<'View', R>
    cssProperties?: React.CSSProperties
    sheet?: TSheeter.Sheet<R>
}



export type getFlagsAll<R extends TSheeter.Shape = TSheeter.Shape> =
    getSheetFlags<R> | getBreakpoints<R> // TSheeter.RulesetNamesAll<R> | 

declare module 'reactxx-typings' {

    namespace TVariants {

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds, R extends TSheeter.Shape> {
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

    initVariant$transition()
    initVariant$sheetFlags()
    initGlobalState({

        createPipeline: widthsPipe,

        finishPropsCode: (propsCode, state) => {
            const flags = sheetFlags_finishPropsCode1(state)
            propsCode.toClassNames = rulesets => {
                const sheetQuery = sheetFlags_finishPropsCode2(flags, propsCode)
                const res = toClassNamesWithQuery(sheetQuery, propsCode.theme, rulesets)
                transition_finishPropsCode3(res)
                return res
            }
        }

    })
}
let initCoreCalled = false

initCore()
