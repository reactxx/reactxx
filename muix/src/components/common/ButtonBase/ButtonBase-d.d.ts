declare namespace MuiButtonBase {

  type KeyView = 'ripple' | 'root' 
  type KeyText = 'disabledLabel'

  type Shape = Overwrite<Mui.EmptyShape, {
    native: Record<KeyView, RN.ViewStyle>
    props: {
      disabled?: boolean
      disableRipple?: boolean
      disableFocusRipple?: boolean;
      rootRef?: React.Ref<any>
    }
    propsNative: RN.TouchableOpacityProperties
 }>
}