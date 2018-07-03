import { Types } from './types'
import { TCommonStyles } from './common-styles'
import { TCommon } from './common'


export namespace TAddIn {

  /******************************************
    RULESETX & SHEETX
  *******************************************/

  //******************** Cross platform
  export namespace TWhenUsed {
    export type PartialSheetX<R extends Types.Shape = Types.Shape, T extends TCommonStyles.RulesetNativeIds = 'Text'> =
      SheetXCommon<R, T> & SheetXNative<R, T> & SheetXWeb<R, T>

    export type SheetXCommon<R extends Types.Shape = Types.Shape, T extends TCommonStyles.RulesetNativeIds = 'Text'> =
      { [P in keyof TCommon.getCommon<R>]?: Partial<Types.RulesetXPure<T>> }
    export type SheetXNative<R extends Types.Shape = Types.Shape, T extends TCommonStyles.RulesetNativeIds = 'Text'> =
      { [P in keyof TCommon.getNative<R>]?: { $native?: TCommonStyles.RulesetNative<TCommon.getNative<R>[P]> } }
    export type SheetXWeb<R extends Types.Shape = Types.Shape, T extends TCommonStyles.RulesetNativeIds = 'Text'> =
      { [P in TCommon.getWeb<R>]?: { $web?: TCommonStyles.RulesetWeb } }
  }


  export interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Types.Shape = Types.Shape> {
    $whenUsed?: TWhenUsed.PartialSheetX<R, T>
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
  //export enum addInProps { ignore = 'ignore', CONSTANT = 'CONSTANT', developer_flag ='developer_flag'}
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
