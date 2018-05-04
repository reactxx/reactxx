import ReactN from 'react-native'

import { Muix } from 'reactxx-mui/typings/muix'
import { Types, TTheme } from 'reactxx'
import { TComps } from 'reactxx-primitives'

import { ButtonBaseProps } from './mui'

export namespace MuiButtonBaseT {

  export const enum CompNames {
    ButtonBase = 'MuiButtonBase',
  }

  export type Shape = Types.OverwriteShape<{
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

  export type RippleEfectProps = ButtonBaseStyles & Partial<Types.CodePropsNative<MuiButtonBaseT.Shape>>

}
