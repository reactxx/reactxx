import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, themePipe, RenderAddIn, TRenderState as TRenderStateBasic, withStyles, deepMerges, whenUsedFinishAddIns } from 'reactxx-basic'
import { animations, TAnimation } from 'reactxx-animation'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

/************************
* TRenderState
*************************/
export interface TRenderState extends TRenderStateBasic {
  addInProps?: TAddIn.PropsX
  //codeSystemProps?: Types.CodeSystemProps
  //addInClasses?: TAddIn.SheetX
  finalProps?: Types.CodeProps
}

/************************
* ADDINS
*************************/

export const stylePipe = (state: TRenderState, next) =>
  animations( // process animation $animations part of sheet
    () => state.addInClasses && state.addInClasses.$animations as TAnimation.SheetsX,
    animations => state.finalProps.$system.animations = animations,
    next
  )

export const finishAddIns = (addInClasses) => {
  const $anims: TAddIn.SheetX[] = addInClasses.$animations
  if (!$anims || $anims.length === 0) return
  addInClasses.$animations = $anims.length === 1 ? $anims[0] : deepMerges({}, ...$anims)
}

const renderAddIn: RenderAddIn = {
  propsAddInPipeline: (renderState, next) => next,
  styleAddInPipeline: stylePipe,
  finishAddInClasses: [whenUsedFinishAddIns, finishAddIns],
}

/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(sheetCreator, renderAddIn, { ...options || null, name: displayName }, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

