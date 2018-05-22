import ReactN from 'react-native'

import { TCommon } from 'reactxx-basic'
import { Muix } from 'reactxx-mui/typings/muix'
import { Types } from 'reactxx'
import { TComps } from 'reactxx-primitives'

import { ButtonBaseProps } from './mui'

export namespace MuiButtonBaseT {

  export const enum CompNames {
    ButtonBase = 'MuiButtonBase',
  }

  export type Shape = Types.OverwriteShape<{
    common: TCommon.ShapeViews<'root'>
    native: TCommon.ShapeViews<'ripple'>
    props: ButtonBaseProps //& ReactXX.OnPressAllWeb
    propsNative: ReactN.TouchableOpacityProperties
    //nameType: CompNames.ButtonBase
    theme: TCommon.ThemeBase & Muix.Theme
  }>

  export interface ButtonBaseStyles {
    viewStyle: ReactN.ViewStyle
    activeStyle: ReactN.ViewStyle
    rippleStyle: ReactN.ViewStyle
  }

  export type RippleEfectProps = ButtonBaseStyles & Partial<Types.CodePropsNative<MuiButtonBaseT.Shape>>

}
