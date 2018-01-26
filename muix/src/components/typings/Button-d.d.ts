declare namespace MuixButton {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'>
    native: Muix.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'>
    web: 'label' | 'colorInherit' | 'keyboardFocused'
    props: Muix.ButtonProps & Muix.TOnClickWeb
    propsNative: ReactN.TouchableOpacityProperties
    propsWeb: Muix.ButtonProps
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiButton?: Muix.SheetXOrCreator<Shape>
    MuiButtonIconLeft?: Muix.SheetXOrCreator<Shape>
    MuiButtonIconRight?: Muix.SheetXOrCreator<Shape>
  }
}

