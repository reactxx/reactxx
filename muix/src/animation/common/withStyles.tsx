import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, themePipe, renderAddIn, TRenderState as TRenderStateBasic, withStyles, toPlatformSheets, deepMerges } from 'reactxx-basic'
import { animations, TAnimation } from 'reactxx-animation'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

/************************
* TRenderState
*************************/
export interface TRenderState extends TRenderStateBasic {
  addInProps?: TAddIn.PropsX
  //codeSystemProps?: Types.CodeSystemProps
  addInClasses?: TAddIn.SheetX
  finalProps?: Types.CodeProps
}

/************************
* ADDINS
*************************/

export const afterToPlatform = (state: TRenderState, next) =>
  animations( // process animation $animations part of sheet
    () => state.addInClasses && state.addInClasses.$animations,
    animations => state.finalProps.system.animations = animations,
    next
  )

// after converting props and sheet to platform dependent form
renderAddIn.styleAddInPipeline = afterToPlatform

export const finishAddIns = (addIns: any) => {
  const $anims: TAddIn.SheetX[] = addIns.$animations
  addIns.$animations = !$anims || $anims.length === 0 ? null : $anims.length === 1 ? $anims[0] : deepMerges({}, ...$anims)
}

renderAddIn.finishAddIns.push(finishAddIns)

/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(displayName, sheetCreator, options, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

