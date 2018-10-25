// export * from 'reactxx-sheeter'
// export * from 'reactxx-primitives'
// export * from 'reactxx-with-styles'

import { TSheeter, TVariants } from 'reactxx-typings'
import { widthsPipe, sheetWidths_registerVariantHandler } from 'reactxx-sheet-widths'
import { sheetSwitch_registerVariantHandler } from 'reactxx-sheet-switch'
import { innerStatePipe } from 'reactxx-with-state'

import { initGlobalOptions } from 'reactxx-with-styles'

export const initCore = () => {
    if (initCoreCalled) return
    initCoreCalled = true

    sheetWidths_registerVariantHandler()
    sheetSwitch_registerVariantHandler()

    initGlobalOptions({

        getPipes: options => ({
            afterPropsCode: [widthsPipe, innerStatePipe]
        }),

        // finalizePropsCode: null,
        // processDeffereds: null,

    })
}
let initCoreCalled = false

initCore()

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

    // transitionView?: TTransition.Transition<'View', R>
    // transitionText?: TTransition.Transition<'Text', R>

    // transitionNativeView?: TTransition.RulesetNative<'View'>
    // transitionNativeText?: TTransition.RulesetNative<'Text'>

    // transitionGroupView?: TTransition.Group<'View', R>
    // transitionGroupText?: TTransition.Group<'Text', R>
    // transitionGroup$Web?: TTransition.Group<'$Web', R>

    query?: TVariants.Query<R>

}
