import { TCommonStyles, TCommon, TAddIn as TAddInBasic } from 'reactxx-basic'
import { TMediaQ, TAddIn as TAddInMediaq } from 'reactxx-mediaq'
//import { TActivable } from 'reactxx-activable'
import { TAnimation, TAddIn as TAddInAnimation } from 'reactxx-animation'
import { Types } from './types'


export namespace TAddIn {

  /******************************************
    ADDINs
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds, R extends Types.Shape> extends TMediaQ.MediaQRulesetPartX<T>, TAddInBasic.RulesetAddInX<T, R> { }
  export interface SheetX<R extends Types.Shape = Types.Shape> { $animations?: TAnimation.SheetsX<getAnimation<R>> }

    /******************************************
    SHAPE
  *******************************************/
  export interface Shape {
    //**** animation shape
    animation?: TAnimation.Shapes
    //**** mediaq shape
    mediaq?: string | null
    //**** activable
    //activable?: boolean | never
  }

  export interface ShapeDefault {
    animation: {}
    mediaq: null
    //activable: never
  }

  export type getAnimation<R extends Shape> = R['animation']
  export type getMediaQ<R extends Shape = Shape> = R['mediaq']
  //export type getActivable<R extends Shape = Shape> = R['activable']

  /******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropsX<R extends Types.Shape = Types.Shape> extends TAddInMediaq.PropsX<R>, TAddInAnimation.PropsX<R> { }

  //******************** Platform specific
  export interface GetVariant<R extends Types.Shape = Types.Shape> extends TAddInMediaq.GetVariant<R>, TAddInAnimation.GetVariant<R> { }

  //export interface CodePropsLow<R extends Types.Shape = Types.Shape> {
  //  theme?: TCommon.getTheme<R>
  //  variant?: TCommon.getVariant<R>
  //  $mediaq?: TMediaQ.MediaFlags<getMediaQ<R>>
  //  activeFlag?: getActivable<R>
  //}

  //export interface CodePropsWeb<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
  //  animations?: TAnimation.DriversWeb<getAnimation<R>>
  //}

  //export interface CodePropsNative<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
  //  animations?: TAnimation.DriversNative<getAnimation<R>>
  //}

  export interface CodeProps<R extends Types.Shape = Types.Shape> extends TAddInMediaq.CodeProps<R>, TAddInAnimation.CodeProps<R> { }

}
