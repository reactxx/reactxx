import ReactN from 'react-native'

export type ButtonBaseKeyView = 'ripple' | 'root'
export type ButtonBaseKeyText = 'disabledLabel'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  native: Record<ButtonBaseKeyView, ReactN.ViewStyle>
  props: {
    disabled?: boolean
    disableRipple?: boolean
    disableFocusRipple?: boolean;
    rootRef?: React.Ref<any>
  }
  propsNative: ReactN.TouchableOpacityProperties
}>
