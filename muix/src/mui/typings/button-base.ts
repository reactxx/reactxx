import { ButtonBaseProps } from './mui'
import ReactN from 'react-native'

import { Muix } from 'reactxx-mui/typings/muix'
import { Types } from 'reactxx-basic'
import { TComps, TBasic, TTheme } from 'reactxx'
//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
export namespace MuiButtonBaseT {

  export const enum CompNames {
    ButtonBase = 'MuiButtonBase',
  }

  export type Shape = TBasic.OverwriteShape<{
    common: Types.ShapeViews<'root'>
    native: Types.ShapeViews<'ripple'>
    props: ButtonBaseProps //& ReactXX.OnPressAllWeb
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.ButtonBase
    theme: TTheme.ThemeBase & Muix.Theme
  }>

  export interface ButtonBaseStyles {
    viewStyle: ReactN.ViewStyle
    activeStyle: ReactN.ViewStyle
    rippleStyle: ReactN.ViewStyle
  }

  export type RippleEfectProps = ButtonBaseStyles & Partial<TBasic.CodePropsNative<MuiButtonBaseT.Shape>>

}

//declare namespace ReactXX {
//  interface Shapes {
//    [MuiButtonBase.CompNames.ButtonBase]?: MuiButtonBaseT.Shape
//  }
//}

