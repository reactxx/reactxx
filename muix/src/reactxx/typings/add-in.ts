import { Types } from 'reactxx-basic'
import { TMediaQ } from 'reactxx-mediaq'
import { TActivable } from 'reactxx-activable'
import { TAnimation } from 'reactxx-animation'
import { TBasic } from './basic'

export namespace TAddIn {

  /******************************************
    ADDINs
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends Types.RulesetNativeIds, R extends TBasic.Shape> extends TMediaQ.MediaQRulesetPartX<T> { }
  export interface SheetAddInX<R extends TBasic.Shape = TBasic.Shape> { $animations?: TAnimation.SheetsX<TBasic.getAnimation<R>> }


  /******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropX<R extends TBasic.Shape = TBasic.Shape> {
    ignore?: boolean
    CONSTANT?: boolean,
    $mediaq?: TMediaQ.NotifyIntervalCreator<TBasic.getMediaQ<R>>
    $active?: TBasic.getActivable<R> extends boolean ? boolean : never
  }

  //******************** Platform specific
  export interface CodePropsLow<R extends TBasic.Shape = TBasic.Shape> {
    theme?: Types.getTheme<R>
    variant?: Types.getVariant<R>
    mediaqFlags?: TMediaQ.MediaFlags<TBasic.getMediaQ<R>>
    activeFlag?: TBasic.getActivable<R>
  }

  export interface CodePropsWeb<R extends TBasic.Shape = TBasic.Shape> extends CodePropsLow<R> {
    animations?: TAnimation.DriversWeb<TBasic.getAnimation<R>>
  }

  export interface CodePropsNative<R extends TBasic.Shape = TBasic.Shape> extends CodePropsLow<R> {
    animations?: TAnimation.DriversNative<TBasic.getAnimation<R>>
  }

  export interface CodeProps<R extends TBasic.Shape = TBasic.Shape> extends CodePropsLow<R> {
    animations?: TAnimation.Drivers<TBasic.getAnimation<R>>
  }

}
