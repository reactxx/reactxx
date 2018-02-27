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
    props: Muix.ButtonProps & ReactXX.OnPressAllX
    propsNative: ReactN.TouchableOpacityProperties
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    [MuiButton.CompNames.Button]?: ReactXX.SheetOrCreator<MuiButton.Shape>
    [MuiButton.CompNames.ButtonIconLeft]?: ReactXX.SheetOrCreator<MuiButton.Shape>
    [MuiButton.CompNames.ButtonIconRight]?: ReactXX.SheetOrCreator<MuiButton.Shape>
  }
}

