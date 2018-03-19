import { ButtonBaseProps } from './mui'
import ReactN from 'react-native'

import { TSheets } from 'reactxx-typings'
//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
export namespace MuiButtonBaseT {

  export const enum CompNames {
    ButtonBase = 'MuiButtonBase',
  }

  export type Shape = TSheets.OverwriteShape<{
    common: TSheets.ShapeViews<'root'>
    native: TSheets.ShapeViews<'ripple'>
    props: ButtonBaseProps //& ReactXX.OnPressAllWeb
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.ButtonBase
  }>

  export interface ButtonBaseStyles {
    viewStyle: ReactN.ViewStyle
    activeStyle: ReactN.ViewStyle
    rippleStyle: ReactN.ViewStyle
  }

  export type RippleEfectProps = ButtonBaseStyles & Partial<TSheets.CodePropsNative<MuiButtonBaseT.Shape>>

}

//declare namespace ReactXX {
//  interface Shapes {
//    [MuiButtonBase.CompNames.ButtonBase]?: MuiButtonBaseT.Shape
//  }
//}

