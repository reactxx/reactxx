declare namespace MuixButton {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini' | 'label'>
    native: ReactXX.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'> & ReactXX.ShapeTexts<'labelIcon'>
    web: 'colorInherit' | 'keyboardFocused'
    props: Muix.ButtonProps & ReactXX.OnPressAllX
    propsNative: ReactN.TouchableOpacityProperties
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiButton?: ReactXX.PartialSheetX<MuixButton.Shape>
    MuiButtonIconLeft?: ReactXX.PartialSheetX<MuixButton.Shape>
    MuiButtonIconRight?: ReactXX.PartialSheetX<MuixButton.Shape>
  }
}

