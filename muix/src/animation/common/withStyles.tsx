import React from 'react';
import { RenderAddIn, TRenderState, withStyles } from 'reactxx-basic';
import { animationFinishAddInClasses } from 'reactxx-sheeter';
import { Types } from '../typings/types';
import { animations } from './animation';



/************************
* ADDINS
*************************/

export const stylePipe = (state: TRenderState, next) =>
  animations( // process animation $animations addin of sheet
    () => state.finalProps.$system.classes.$system && state.finalProps.$system.classes.$system['$animations'],
    animations => animations && (state.finalProps['$animations'] = animations),
    next
  )

const renderAddIn: RenderAddIn = {
  propsAddInPipeline: (renderState, next) => next,
  styleAddInPipeline: stylePipe,
  finishAddInClasses: {
    $animations: animationFinishAddInClasses
  }
}

/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(sheetCreator, renderAddIn, { ...options || null, name: displayName }, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

