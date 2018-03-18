declare namespace MuiButton {

  const enum CompNames {
    Button = 'MuiButton',
    ButtonIconLeft = 'MuixButtonIconLeft',
    ButtonIconRight = 'MuixButtonIconRight',
  }

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini' > & ReactXX.ShapeTexts<'label'>
    native: ReactXX.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'> & ReactXX.ShapeTexts<'labelIcon'>
    web: 'colorInherit' | 'keyboardFocused'
    props: Mui.ButtonProps & ReactXX.OnPressAllX
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.Button | CompNames.ButtonIconLeft | CompNames.ButtonIconRight
  }>

}

declare namespace ReactXX {
  interface Shapes {
    [MuiButton.CompNames.Button]?: MuiButton.Shape
    [MuiButton.CompNames.ButtonIconLeft]?: MuiButton.Shape
    [MuiButton.CompNames.ButtonIconRight]?: MuiButton.Shape
  }
}

