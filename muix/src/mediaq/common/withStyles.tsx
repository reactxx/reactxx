import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, themePipe, renderAddIn, TRenderState as TRenderStateBasic, withStyles, mergeSheets, deepMerges } from 'reactxx-basic'
import { mediaQFlags, TMediaQ, MediaQ_AppContainer, mediaQProviderExists, mediaQSheet } from 'reactxx-mediaq'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

/************************
* TRenderState
*************************/
export interface TRenderState extends TRenderStateBasic {
  addInProps?: TAddIn.PropsX
  //codeSystemProps?: Types.CodeSystemProps
  platformProps?: Types.CodeProps
}

/************************
* ADDINS
*************************/

export const beforeToPlatform = (state: TRenderState, next) =>
  mediaQFlags( // media flags, e.g. {mobile:false, tablet:true, desktop:false }
    () => ({ $mediaq: state.addInProps.$mediaq, theme: state.themeContext.theme }),
    mediaqFlags => mediaqFlags && (state.codeSystemPropsPatch['reactxx-mediaq'] = { mediaqFlags }),
    next)

export const afterToPlatform = (state: TRenderState, next) =>
  mediaQSheet( // actualize mediaq part of the ruleset
    () => state.addInClasses as TMediaQ.MediaQSheet,
    mediaSheetPatch => mediaSheetPatch && state.codeClassesPatch.push(mediaSheetPatch as Types.Sheet),
    next
  )

export const finishAddIns = (addIns: {}) => {
  for (const p in addIns) {
    const addInsp = addIns[p]
    const $mediaq: Array<{}> = addInsp && addInsp.$mediaq
    if (!$mediaq) continue
    addIns[p].$mediaq = $mediaq.length === 0 ? null : $mediaq.length === 1 ? $mediaq[0] : deepMerges({}, ...$mediaq)
  }
}

renderAddIn.finishAddIns.push(finishAddIns)
//export const finishAddIns = (propName: string, value) => {
//  if (propName != '$mediaq') return {}
//  return {
//    done: true,
//    value: (val => {
//      const res = {}
//      for (const p in val) res[p] = toPlatformRuleSetInPlace(val)
//      return res
//    })()
//  }
//}

// used before converting props and sheet to platform dependent form
renderAddIn.propsAddInPipeline = beforeToPlatform

// after converting props and sheet to platform dependent form
renderAddIn.styleAddInPipeline = afterToPlatform

//renderAddIn.toPlatformRulesetHooks = [finishAddIns]

/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(displayName, sheetCreator, options, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const AppContainer: React.SFC<Partial<TCommon.ThemeProviderProps>> = props => {
  const theme = <ThemeProvider theme={props}>{props.children}</ThemeProvider>
  return mediaQProviderExists() ? theme : <MediaQ_AppContainer>{theme}</MediaQ_AppContainer>
}