import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, theme, renderAddIn, withStyles, TRenderState as TRenderStateBasic } from 'reactxx-basic'
import { animations, TAnimation, toPlatformSheetHooks as AnimationToPlatformSheetHooks, afterToPlatform as AnimationAfterToPlatform } from 'reactxx-animation'
import { mediaQFlags, TMediaQ, MediaQ_AppContainer, mediaQProviderExists, mediaQSheet, afterToPlatform as MediaQAfterToPlatform, beforeToPlatform as MediaQBeforeToPlatform, toPlatformRulesetHooks as MediaQToPlatformRulesetHooks } from 'reactxx-mediaq'
import { activeFlag, activeSheet, TActivable } from 'reactxx-activable'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* TRenderState
*************************/
export interface TRenderState extends TRenderStateBasic {
  addInProps?: TAddIn.PropsX
  codeSystemProps?: Types.CodeSystemProps
  codeClasses?: Types.Sheet & TAddIn.SheetX
  addInClasses?: TAddIn.SheetX
}

/************************
* ADDINS
*************************/

// before converting props and sheet to platform dependent form
renderAddIn.beforeToPlatform = MediaQBeforeToPlatform

// after converting props and sheet to platform dependent form
renderAddIn.afterToPlatform = (state: TRenderState, next) => MediaQAfterToPlatform(state, AnimationAfterToPlatform(state, next))
//mediaQSheet( // actualize mediaq part of ruleset
//  () => state.codeClasses as TMediaQ.MediaQSheet,
//  mediaSheetPatch => mediaSheetPatch && state.codeClassesPatch.push(mediaSheetPatch as Types.Sheet),
//  animations( // process animation $animations part of sheet
//    () => state.codeClasses.$animations,
//    animations => state.codeSystemProps.animations = animations,
//    next
//  )
//)

renderAddIn.toPlatformSheetHooks = [AnimationToPlatformSheetHooks]

renderAddIn.toPlatformRulesetHooks = [MediaQToPlatformRulesetHooks]


/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(name, sheetCreator, options, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const AppContainer: React.SFC<Partial<TCommon.ThemeProviderProps>> = props => {
  const theme = <ThemeProvider theme={props}>{props.children}</ThemeProvider>
  return mediaQProviderExists() ? theme : <MediaQ_AppContainer>{theme}</MediaQ_AppContainer>
}