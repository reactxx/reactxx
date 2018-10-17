// export * from 'reactxx-sheeter'
// export * from 'reactxx-primitives'
// export * from 'reactxx-with-styles'

import { TCommonStyles, TSheeter, TVariants } from 'reactxx-typings'
import { toClassNamesWithQuery } from 'reactxx-sheeter'
import { transition_registerVariantHandler, transition_processDeffereds, transition_finalizePropsCode, TTransition } from 'reactxx-sheet-transition'
import { widthsPipe } from 'reactxx-sheet-widths'
import { sheetSwitch_registerVariantHandler, getCases } from 'reactxx-sheet-switch'

export type getFlagsAll<R extends TSheeter.Shape = TSheeter.Shape> =
    getCases<R> //| getBreakpoints<R> // TSheeter.RulesetNamesAll<R> | 

import { initGlobalState } from 'reactxx-with-styles'

export const initCore = () => {
    if (initCoreCalled) return
    initCoreCalled = true

    transition_registerVariantHandler()
    sheetSwitch_registerVariantHandler()

    initGlobalState({

        getPipes: (systemPipes, options) => [
            ...systemPipes.firsts, 
            widthsPipe, 
            ...systemPipes.lasts
        ],

        finalizePropsCode: state => {
            //state.withSheetQueryComponent = true
            transition_finalizePropsCode(state)
            state.propsCode.toClassNames = rulesets => toClassNamesWithQuery(state, rulesets)
        },

        processDeffereds: transition_processDeffereds,

    })
}
let initCoreCalled = false

initCore()


declare module 'reactxx-typings' {

    namespace TVariants {

        // interface VariantPart<T extends TCommonStyles.RulesetNativeIds, R extends TSheeter.Shape> {
        //     [Consts.name]?: SheetSwitchPart<T, R>
        // }
        // type SheetSwitchPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        //     getFlagsAll<R> extends never ? never :
        //     PartialRecord<getFlagsAll<R>, TSheeter.RulesetOrAtomized<T, R>>
    }
}

// workaround due to https://github.com/Microsoft/TypeScript/issues/27448
export interface TSBugHelper<R extends TSheeter.Shape> {
    sheet?: TSheeter.Sheet<R>
    sheetCreator?: TSheeter.SheetCreator<R>

    view?: TSheeter.RulesetOrAtomized<'View', R>
    text?: TSheeter.RulesetOrAtomized<'Text', R>
    web?: TSheeter.RulesetWebOrAtomized<'$Web', R>
    nativeView?: TSheeter.RulesetNativeOrAtomized<'View', R>
    nativeText?: TSheeter.RulesetNativeOrAtomized<'Text', R>

    sheetSwitchView?: TVariants.SheetSwitchPart<'View', R>
    sheetSwitchText?: TVariants.SheetSwitchPart<'Text', R>
    sheetSwitch$Web?: TVariants.SheetSwitchPart<'$Web', R>

    sheetWidthsView?: TVariants.SheetWidthsPart<'View', R>
    sheetWidthsText?: TVariants.SheetWidthsPart<'Text', R>
    sheetWidths$Web?: TVariants.SheetWidthsPart<'$Web', R>

    transitionView?: TTransition.Transition<'View', R>
    transitionText?: TTransition.Transition<'Text', R>

    transitionNativeView?: TTransition.RulesetNative<'View'>
    transitionNativeText?: TTransition.RulesetNative<'Text'>

    transitionGroupView?: TTransition.Group<'View', R>
    transitionGroupText?: TTransition.Group<'Text', R>
    transitionGroup$Web?: TTransition.Group<'$Web', R>

    query?: TVariants.Query<R>

}
