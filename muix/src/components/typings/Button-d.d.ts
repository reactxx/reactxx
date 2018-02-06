declare namespace MuixButton {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'>
    native: Prim5s.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'>
    web: 'label' | 'colorInherit' | 'keyboardFocused'
    props: Muix.ButtonProps & Prim5s.TOnClickWeb
    propsNative: ReactN.TouchableOpacityProperties
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiButton?: Muix.SheetXOrCreator<MuixButton.Shape>
    MuiButtonIconLeft?: Muix.SheetXOrCreator<MuixButton.Shape>
    MuiButtonIconRight?: Muix.SheetXOrCreator<MuixButton.Shape>
  }
}

