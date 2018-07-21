import React from 'react';
import { stylePipe as animationStylePipe } from 'reactxx-animation';
import { RenderAddIn, TCommon, ThemeProvider, TRenderState, withStyles } from 'reactxx-basic';
import { mediaqFinishAddInClasses, mediaqFinishAddInProps, MediaQ_AppContainer, propsPipe as mediaQPropsPipe, stylePipe as mediaQStylePipe } from 'reactxx-mediaq';
import { animationFinishAddInClasses } from 'reactxx-sheeter';
import { Types } from '../typings/types';



//const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* ADDINS
*************************/

const renderAddIn: RenderAddIn = {
  propsAddInPipeline: mediaQPropsPipe,
  styleAddInPipeline: (state: TRenderState, next) => mediaQStylePipe(state, animationStylePipe(state, next)),
  finishAddInProps: { 
    '$mediaq': mediaqFinishAddInProps 
  },
  finishAddInClasses: {
    $animations: animationFinishAddInClasses,
    '$mediaq': mediaqFinishAddInClasses
  }
}



/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(sheetCreator, renderAddIn, { ...options || null }, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const AppContainer: React.SFC<Partial<TCommon.ThemeProviderProps>> = props => <MediaQ_AppContainer><ThemeProvider theme={props}>{props.children}</ThemeProvider></MediaQ_AppContainer>
