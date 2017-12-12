declare namespace MuiButtonBase {

  type KeyView = 'ripple' | 'root' 
  type KeyText = 'disabledLabel'

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    native: Record<KeyView, ReactN.ViewStyle>
    props: {
      disabled?: boolean
      disableRipple?: boolean
      disableFocusRipple?: boolean;
      rootRef?: React.Ref<any>
    }
    propsNative: ReactN.TouchableOpacityProperties
 }>
}