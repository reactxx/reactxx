﻿import React from 'react';
import { RenderAddIn, TRenderState, withStyles } from 'reactxx-basic';
import { animationFinishAddInClasses } from 'reactxx-sheeter';
import { Types } from '../typings/types';
import { TAddIn } from '../typings/add-in';
import { animations } from './animation';



/************************
* ADDINS
*************************/

export const stylePipe = (state: TRenderState, next) =>
  animations( // process animation $animations addin of sheet
    () => state.finalProps.classes.$system && state.finalProps.classes.$system['$animations'],
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
    (sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(sheetCreator, renderAddIn, { ...options || null }, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

