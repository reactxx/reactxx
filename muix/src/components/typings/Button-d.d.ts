declare namespace MuixButton {

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'>
    native: ReactXX.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'>
    web: 'label' | 'colorInherit' | 'keyboardFocused'
    props: Muix.ButtonProps & ReactXX.OnPressAllWeb
    propsNative: ReactN.TouchableOpacityProperties
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiButton?: Muix.SheetXOrCreator<MuixButton.Shape>
    MuiButtonIconLeft?: Muix.SheetXOrCreator<MuixButton.Shape>
    MuiButtonIconRight?: Muix.SheetXOrCreator<MuixButton.Shape>
  }
}

