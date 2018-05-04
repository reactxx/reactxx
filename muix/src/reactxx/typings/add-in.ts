import { TCommonStyles } from 'reactxx-basic'
import { TMediaQ } from 'reactxx-mediaq'
import { TActivable } from 'reactxx-activable'
import { TAnimation } from 'reactxx-animation'
import { Types } from './types'

export namespace TAddIn {

  /******************************************
    ADDINs
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds, R extends Types.Shape> extends TMediaQ.MediaQRulesetPartX<T> { }
  export interface SheetAddInX<R extends Types.Shape = Types.Shape> { $animations?: TAnimation.SheetsX<getAnimation<R>> }


  /******************************************
    SHAPE
  *******************************************/
  export interface Shape {
    //**** animation shape
    animation?: TAnimation.Shapes
    //**** mediaq shape
    mediaq?: string | null
    //**** activable
    activable?: boolean | never
  }

  export interface ShapeDefault {
    animation: {}; mediaq: null; activable: never
  }

  export type getAnimation<R extends Shape> = R['animation']
  export type getMediaQ<R extends Shape = Shape> = R['mediaq']
  export type getActivable<R extends Shape = Shape> = R['activable']

  /******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropX<R extends Types.Shape = Types.Shape> {
    ignore?: boolean
    CONSTANT?: boolean,
    $mediaq?: TMediaQ.NotifyIntervalCreator<getMediaQ<R>>
    $active?: getActivable<R> extends boolean ? boolean : never
  }

  //******************** Platform specific
  export interface CodePropsLow<R extends Types.Shape = Types.Shape> {
    theme?: Types.getTheme<R>
    variant?: Types.getVariant<R>
    mediaqFlags?: TMediaQ.MediaFlags<getMediaQ<R>>
    activeFlag?: getActivable<R>
  }

  export interface CodePropsWeb<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
    animations?: TAnimation.DriversWeb<getAnimation<R>>
  }

  export interface CodePropsNative<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
    animations?: TAnimation.DriversNative<getAnimation<R>>
  }

  export interface CodeProps<R extends Types.Shape = Types.Shape> extends CodePropsLow<R> {
    animations?: TAnimation.Drivers<getAnimation<R>>
  }

}
