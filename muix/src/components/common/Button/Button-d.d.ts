declare namespace MuiButton {

  type KeyView = MuiButtonBase.KeyView | 'dense' | /*'flatPrimary' | 'flatAccent' | 'flatContrast' | 'colorInherit' | 'raisedContrast' |*/ 'raised' | 'raisedPrimary' | 'raisedAccent' | 'fab' | 'fabActive' | 'raisedActive' | 'raisedDisable'
  type KeyText = MuiButtonBase.KeyText | 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

  type Shape = Overwrite<Mui.EmptyShape, {
    native: Record<KeyText, RN.TextStyle> & Record<KeyView, RN.ViewStyle>
    props: {
      color?: Mui.PropTypes.Color | 'contrast' | 'default'
      dense?: boolean
      fab?: boolean
      href?: string
      raised?: boolean
      rootRef?: React.Ref<any>
    }
    propsNative: RN.TouchableOpacityProperties
  }>

}
