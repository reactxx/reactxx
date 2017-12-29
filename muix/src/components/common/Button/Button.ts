import ReactN from 'react-native'

//import { ButtonProps } from 'material-ui/Button/Button'
import { ButtonBaseKeyText, ButtonBaseKeyView } from '../ButtonBase/ButtonBase'

export type KeyView = ButtonBaseKeyView | 'dense' | /*'flatPrimary' | 'flatAccent' | 'flatContrast' | 'colorInherit' | 'raisedContrast' |*/ 'raised' | 'raisedPrimary' | 'raisedAccent' | 'fab' | 'fabActive' | 'raisedActive' | 'raisedDisable'
export type KeyText = ButtonBaseKeyText | 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  native: Record<KeyText, ReactN.TextStyle> & Record<KeyView, ReactN.ViewStyle>
  props: Mui.ButtonProps
  propsNative: ReactN.TouchableOpacityProperties
}>


