import { Types } from './types'
import { TCommonStyles } from './common-styles'


export namespace TAddIn {

  /******************************************
    RULESETX & SHEETX
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds, R extends Types.Shape> { }
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
  export enum addInProps { ignore = 'ignore', CONSTANT = 'CONSTANT'}
  export interface PropX<R extends Types.Shape = Types.Shape> {
    [addInProps.ignore]?: boolean
    [addInProps.CONSTANT]?: boolean,
  }

  //******************** Platform specific
  export interface GetVariant<R extends Types.Shape = Types.Shape> { }

  export interface CodePropsWeb<R extends Types.Shape = Types.Shape> { }

  export interface CodePropsNative<R extends Types.Shape = Types.Shape> { }

  export interface CodeProps<R extends Types.Shape = Types.Shape> { }

}
