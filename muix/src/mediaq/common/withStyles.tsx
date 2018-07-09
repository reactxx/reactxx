import React from 'react'
import ReactN from 'react-native'

import { AddIns as SheeterAddIns } from 'reactxx-sheeter'
import { TCommon, ThemeProvider, themePipe, RenderAddIn, TRenderState, withStyles } from 'reactxx-basic'
import { mediaQFlags, mediaQSheet, MediaQ_AppContainer, mediaqFinishAddInClasses, mediaqFinishAddInProps } from 'reactxx-mediaq'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { TMediaQ } from '../typings/mediaq'

/************************
* ADDINS
*************************/

export const propsPipe = (state: TRenderState, next) =>
  mediaQFlags( // media flags, e.g. {mobile:false, tablet:true, desktop:false }
    () => ({ addIns: state.platformProps.$system as SheeterAddIns, getPropsPatches: state.getPropsPatches }),
    next)

export const stylePipe = (state: TRenderState, next) =>
  mediaQSheet( // actualize $mediaq part of the ruleset
    () => state.getClassesPatches,
    next
  )

//export const finishAddIns = (addInClasses: { [rulesetName: string]: { $mediaq?: {}[] /*input type*/ | TCommon.SheetFragmentsData /*output type*/ } }) => {
//  // addIns = e.g. { root: { $mediaq: { '480-1024': Types.RulesetX } } }
//  for (const p in addInClasses) {
//    const addInsp = addInClasses[p]
//    const $mediaq = addInsp && addInsp.$mediaq as {}[] // input type
//    if (!$mediaq) continue
//    // output: addIns.root.$mediaq = e.g. { name: '480-1024', __fragments: [ {color: 'red', $web: {...}}, {':hover: {}'} ] }
//    addInClasses[p].$mediaq = toPlatformSheets(null, $mediaq).codeClasses // convert to output type
//  }
//}

const renderAddIn: RenderAddIn = {
  propsAddInPipeline: propsPipe,
  styleAddInPipeline: stylePipe,
  finishAddInProps: { '$mediaq': mediaqFinishAddInProps },
  finishAddInClasses: { '$mediaq': mediaqFinishAddInClasses },
}

export const breaksToString = (start: number, end: number) => `${start ? start : ''}-${end ? end : ''}` //`

/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(sheetCreator, renderAddIn, { ...options || null, name: displayName }, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const AppContainer: React.SFC<Partial<TCommon.ThemeProviderProps>> = props => <MediaQ_AppContainer><ThemeProvider theme={props}>{props.children}</ThemeProvider></MediaQ_AppContainer>
