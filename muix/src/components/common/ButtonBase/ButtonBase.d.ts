//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
declare namespace ButtonBase {

  type ButtonBaseKeyView = 'ripple' | 'root'
  type ButtonBaseKeyText = 'disabledLabel'

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    native: Record<ButtonBaseKeyView, ReactN.ViewStyle>
    props: Mui.ButtonBaseProps
    propsNative: ReactN.TouchableOpacityProperties
  }>
}

declare namespace Mui {
  interface Shapes {
    MuiButton?: Mui.SheetXOrCreator<Button.Shape>
  }
}

