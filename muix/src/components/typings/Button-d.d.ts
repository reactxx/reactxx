declare namespace MuixButton {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'>
    native: Muix2.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'>
    web: 'label' | 'colorInherit' | 'keyboardFocused'
    props: Muix.ButtonProps & Muix2.TOnClickWeb
    propsNative: ReactN.TouchableOpacityProperties
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiButton?: Muix.SheetXOrCreator<MuixButton.Shape>
    MuiButtonIconLeft?: Muix.SheetXOrCreator<MuixButton.Shape>
    MuiButtonIconRight?: Muix.SheetXOrCreator<MuixButton.Shape>
  }
}

