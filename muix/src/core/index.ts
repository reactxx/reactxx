// export * from 'reactxx-sheeter'
// export * from 'reactxx-primitives'
// export * from 'reactxx-with-styles'

import { TCommonStyles, TSheeter, TVariants } from 'reactxx-typings'
import { toClassNamesWithQuery } from 'reactxx-sheeter'
import { transition_registerVariantHandler, transition_toPlatformClassName, transition_finalizePropsCode1, TTransition } from 'reactxx-sheet-transition'
import { widthsPipe, getBreakpoints } from 'reactxx-sheet-widths'
import { sheetFlags_registerVariantHandler, Consts, getSheetFlags, sheetFlags_finalizePropsCode1, sheetFlags_finalizePropsCode2 } from 'reactxx-sheet-flags'

// workaround due to https://github.com/Microsoft/TypeScript/issues/27448
export interface TSBugHelper<R extends TSheeter.Shape> {
    sheet?: TSheeter.Sheet<R>
    sheetCreator?: TSheeter.SheetCreator<R>

    view?: TSheeter.RulesetOrAtomized<'View', R>
    text?: TSheeter.RulesetOrAtomized<'Text', R>
    web?: TSheeter.RulesetWebOrAtomized<'$Web', R>
    nativeView?: TSheeter.RulesetNativeOrAtomized<'View', R>
    nativeText?: TSheeter.RulesetNativeOrAtomized<'Text', R>

    sheetFlagsView?: TVariants.WhenFlagPart<'View', R>
    sheetFlagsText?: TVariants.WhenFlagPart<'Text', R>
    sheetFlags$Web?: TVariants.WhenFlagPart<'$Web', R>

    transitionView?: TTransition.Transition<'View', R>
    transitionText?: TTransition.Transition<'Text', R>

    transitionNativeView?: TTransition.RulesetNative<'View'>
    transitionNativeText?: TTransition.RulesetNative<'Text'>

    transitionGroupView?: TTransition.Group<'View', R>
    transitionGroupText?: TTransition.Group<'Text', R>
    transitionGroup$Web?: TTransition.Group<'$Web', R>

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

    transition_registerVariantHandler()
    sheetFlags_registerVariantHandler()
    
    initGlobalState({

        createPipeline: widthsPipe,

        finalizePropsCode: (propsCode, state) => {
            const flags = sheetFlags_finalizePropsCode1(state)
            transition_finalizePropsCode1(state)
            propsCode.toClassNames = rulesets => {
                const sheetQuery = sheetFlags_finalizePropsCode2(flags, propsCode)
                const res = toClassNamesWithQuery(sheetQuery, propsCode.theme, rulesets)
                res.state = state
                return res
            }
        },

        toPlatformClassName: transition_toPlatformClassName

    })
}
let initCoreCalled = false

initCore()
