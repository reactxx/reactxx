﻿import { TCommonStyles, TCommon, TAddIn as TAddInBasic } from 'reactxx-basic'
import { TMediaQ } from 'reactxx-mediaq'
import { Types } from './types'


export namespace TAddIn {

  /******************************************
    ADDINs
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds, R extends Types.Shape> extends TMediaQ.MediaQRulesetPartX<T> { }
  export interface SheetX<R extends Types.Shape = Types.Shape> { }


  /******************************************
    SHAPE
  *******************************************/
  export interface Shape {
    //**** mediaq shape
    mediaq?: string | null
  }

  export interface ShapeDefault {
    mediaq: null
  }

  export type getMediaQ<R extends Shape = Shape> = R['mediaq']

  /******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropsX<R extends Types.Shape = Types.Shape> extends TAddInBasic.PropsX<R> {
    $mediaq?: TMediaQ.NotifyIntervalCreator<getMediaQ<R>>
  }

  //******************** Platform specific
  export interface GetVariant<R extends Types.Shape = Types.Shape> {
    mediaqFlags?: TMediaQ.MediaFlags<TAddIn.getMediaQ<R>>
  }

  export interface CodePropsLow<R extends Types.Shape = Types.Shape> {
    mediaqFlags?: TMediaQ.MediaFlags<getMediaQ<R>>
  }

  export interface CodePropsWeb<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
  }

  export interface CodePropsNative<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
  }

  export interface CodeProps<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
  }

}
