import { Types } from './types'
import { TCommonStyles } from './common-styles'


export namespace TAddIn {

  /******************************************
    RULESETX & SHEETX
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds, R extends Types.Shape> { }
  export interface SheetAddInX<R extends Types.Shape = Types.Shape> { }


  /******************************************
  SHAPE
*******************************************/
  export interface Shape { }

  export interface ShapeDefault { }

/******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropX<R extends Types.Shape = Types.Shape> { }

  //******************** Platform specific
  export interface CodePropsWeb<R extends Types.Shape = Types.Shape> { }

  export interface CodePropsNative<R extends Types.Shape = Types.Shape> { }

  export interface CodeProps<R extends Types.Shape = Types.Shape> { }

}
