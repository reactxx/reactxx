import { ButtonBaseProps } from './mui'
//import * as ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
export namespace MuiButtonBaseT {

  export const enum CompNames {
    ButtonBase = 'MuiButtonBase',
  }

  export type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    native: ReactXX.ShapeViews<'ripple'>
    props: ButtonBaseProps //& ReactXX.OnPressAllWeb
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.ButtonBase
  }>

  export interface ButtonBaseStyles {
    viewStyle: ReactN.ViewStyle
    activeStyle: ReactN.ViewStyle
    rippleStyle: ReactN.ViewStyle
  }

  export type RippleEfectProps = ButtonBaseStyles & Partial<ReactXX.CodePropsNative<MuiButtonBaseT.Shape>>

}

//declare namespace ReactXX {
//  interface Shapes {
//    [MuiButtonBase.CompNames.ButtonBase]?: MuiButtonBaseT.Shape
//  }
//}

