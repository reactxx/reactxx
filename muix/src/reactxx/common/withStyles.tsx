import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, themePipe, RenderAddIn, withStyles, TRenderState as TRenderStateBasic } from 'reactxx-basic'
import { animations, TAnimation, stylePipe as animationStylePipe } from 'reactxx-animation'
import { mediaQFlags, TMediaQ, MediaQ_AppContainer, mediaQSheet, stylePipe as mediaQStylePipe, propsPipe as mediaQPropsPipe } from 'reactxx-mediaq'
import { activeFlag, activeSheet, TActivable } from 'reactxx-activable'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

//const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* TRenderState
*************************/
export interface TRenderState extends TRenderStateBasic {
  addInProps?: TAddIn.PropsX
  platformProps?: Types.CodeProps
  //codeSystemProps?: Types.CodeSystemProps
  //codeClasses?: Types.Sheet & TAddIn.SheetX
  //addInClasses?: TAddIn.SheetX
}

/************************
* ADDINS
*************************/

const renderAddIn: RenderAddIn = {
  propsAddInPipeline: mediaQPropsPipe,
  styleAddInPipeline: (state: TRenderState, next) => mediaQStylePipe(state, animationStylePipe(state, next)),
  //finishAddInClasses: [whenUsedFinishAddIns, animationFinishAddIns, mediaFinishAddIns],
}



/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(sheetCreator, renderAddIn, { ...options || null, name: displayName }, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const AppContainer: React.SFC<Partial<TCommon.ThemeProviderProps>> = props => <MediaQ_AppContainer><ThemeProvider theme={props}>{props.children}</ThemeProvider></MediaQ_AppContainer>
