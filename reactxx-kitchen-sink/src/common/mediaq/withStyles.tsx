import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, theme, renderAddIn, TRenderState as TRenderStateBasic, withStyles, toPlatformSheet_all as toPlatformSheet, toPlatformRuleSet_all as toPlatformRuleSet } from 'reactxx-basic'
import { mediaQFlags, TMediaQ, MediaQ_AppContainer, mediaQProviderExists, mediaQSheet } from 'reactxx-mediaq'

import { Types } from './types'
import { TAddIn } from './add-in'

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
renderAddIn.addInHOCsX = (state: TRenderState, next) =>
  mediaQFlags( // media flags, e.g. {mobile:false, tablet:true, desktop:false }
    () => ({ $mediaq: state.addInProps.$mediaq, theme: state.themeContext.theme }),
    mediaqFlags => mediaqFlags && state.propsPatch.push({ mediaqFlags }),
    next)

// after converting props and sheet to platform dependent form
renderAddIn.addInHOCs = (state: TRenderState, next) =>
  mediaQSheet( // actualize mediaq part of the ruleset
    () => state.codeClasses as TMediaQ.MediaQSheet,
    mediaSheetPatch => mediaSheetPatch && state.codeClassesPatch.push(mediaSheetPatch as Types.Sheet),
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

export const AppContainer: React.SFC<Partial<TCommon.ThemeProviderProps>> = props => {
  const theme = <ThemeProvider theme={props}>{props.children}</ThemeProvider>
  return mediaQProviderExists() ? theme : <MediaQ_AppContainer>{theme}</MediaQ_AppContainer>
}