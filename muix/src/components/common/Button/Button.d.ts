//import ReactN from 'react-native'

//import { ButtonProps } from 'material-ui/Button/Button'
//import { ButtonBaseKeyText, ButtonBaseKeyView } from '../ButtonBase/ButtonBase'

declare namespace Button {

  type KeyView = ButtonBase.ButtonBaseKeyView | 'dense' | /*'flatPrimary' | 'flatAccent' | 'flatContrast' | 'colorInherit' | 'raisedContrast' |*/ 'raised' | 'raisedPrimary' | 'raisedAccent' | 'fab' | 'fabActive' | 'raisedActive' | 'raisedDisable'
  type KeyText = ButtonBase.ButtonBaseKeyText | 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    native: Record<KeyText, ReactN.TextStyle> & Record<KeyView, ReactN.ViewStyle>
    props: Mui.ButtonProps
    propsNative: ReactN.TouchableOpacityProperties
  }>

}

declare namespace Mui {
  interface Shapes {
    MuiButtonBase?: Mui.SheetXOrCreator<ButtonBase.Shape>
  }
}

