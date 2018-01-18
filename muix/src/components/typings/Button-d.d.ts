declare namespace MuixButton {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'disabled' | 'dense' | 'flatPrimary' | 'flatAccent' | 'flatContrast' | 'raised' | 'raisedPrimary' | 'raisedAccent' | 'raisedContrast' | 'fab'>
    native: Muix.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'mini' | 'active'>
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

