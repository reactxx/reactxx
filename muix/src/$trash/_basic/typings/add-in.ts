import { TCommonStyles } from './common-styles';
import { Types } from './types';


export namespace TAddIn { 

  /******************************************
    RULESETX & SHEETX
  *******************************************/

  export interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds = unknown, R extends Types.Shape = Types.Shape> {
    $switch?: Types.PartialSheetX<R>
  }
  export interface SheetX<R extends Types.Shape = Types.Shape> { }


  /******************************************
  SHAPE
*******************************************/
  export interface Shape { }

  export interface ShapeDefault { }

  /******************************************
      COMPONENT PROPS
    *******************************************/

  //******************** Cross platform 
  export interface PropsX<R extends Types.Shape = Types.Shape> {
    $ignore?: boolean
    $constant?: boolean
    $developer_flag?: boolean
    $developer_RenderCounter?: number
  }

  //******************** Platform specific
  export interface GetVariant<R extends Types.Shape = Types.Shape> { }

  export interface CodePropsWeb<R extends Types.Shape = Types.Shape> { }

  export interface CodePropsNative<R extends Types.Shape = Types.Shape> { }

  export interface CodeProps<R extends Types.Shape = Types.Shape> { }

}
