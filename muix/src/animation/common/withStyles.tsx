import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, theme, renderAddIn, TRenderState as TRenderStateBasic, withStyles, toPlatformSheet_all as toPlatformSheet, toPlatformRuleSet_all as toPlatformRuleSet } from 'reactxx-basic'
import { animations, TAnimation } from 'reactxx-animation'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

/************************
* TRenderState
*************************/
export interface TRenderState extends TRenderStateBasic {
  addInProps?: TAddIn.PropsX
  addInClasses?: TAddIn.SheetX
  codeSystemProps?: Types.CodeSystemProps
}

/************************
* ADDINS
*************************/

renderAddIn.toPlatformSheet = toPlatformSheet
renderAddIn.toPlatformRuleSet = toPlatformRuleSet

// used before converting props and sheet to platform dependent form
renderAddIn.beforeToPlatform = (state: TRenderState, next) => next

// after converting props and sheet to platform dependent form
renderAddIn.afterToPlatform = (state: TRenderState, next) =>
  animations( // process animation $animations part of sheet
    () => state.addInClasses.$animations,
    animations => state.codeSystemProps.animations = animations,
    next
  )

/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(name, sheetCreator, options, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

