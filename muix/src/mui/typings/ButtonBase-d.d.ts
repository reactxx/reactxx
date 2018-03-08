//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
declare namespace MuiButtonBase {

  const enum CompNames {
    ButtonBase = 'MuiButtonBase',
  }

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    native: ReactXX.ShapeViews<'ripple'>
    props: Muix.ButtonBaseProps //& ReactXX.OnPressAllWeb
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.ButtonBase
  }>

  export interface ButtonBaseStyles {
    viewStyle: ReactN.ViewStyle
    activeStyle: ReactN.ViewStyle
    rippleStyle: ReactN.ViewStyle
  }

  type RippleEfectProps = ButtonBaseStyles & Partial<ReactXX.CodePropsNative<MuiButtonBase.Shape>>

}

declare namespace ReactXX {
  interface SheetsX {
    [MuiButtonBase.CompNames.ButtonBase]?: ReactXX.PartialSheetX<MuiButtonBase.Shape>
  }
  interface Shapes {
    [MuiButtonBase.CompNames.ButtonBase]?: MuiButtonBase.Shape
  }
}

