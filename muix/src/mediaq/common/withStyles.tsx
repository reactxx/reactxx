import React from 'react';
import { RenderAddIn, TCommon, ThemeProvider, TRenderState, withStyles } from 'reactxx-basic';
import { mediaqFinishAddInClasses, mediaqFinishAddInProps, mediaQFlags, mediaQSheet, MediaQ_AppContainer } from 'reactxx-mediaq';
import { AddIns as SheeterAddIns } from 'reactxx-sheeter';
import { Types } from '../typings/types';



/************************
* ADDINS
*************************/

export const propsPipe = (state: TRenderState, next) =>
  mediaQFlags( // media flags, e.g. {mobile:false, tablet:true, desktop:false }
    () => ({ $system: state.platformProps.$system as SheeterAddIns, getPropsPatches: state.getPropsPatches || (state.getPropsPatches = {}) }),
    next)

export const stylePipe = (state: TRenderState, next) =>
  mediaQSheet( // actualize $mediaq part of the ruleset
    () => state.getClassesPatches || (state.getClassesPatches = {}),
    next
  )

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
