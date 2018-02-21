declare namespace MuixIconButton {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.IconButtonProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiIconButton?: ReactXX.PartialSheetX<MuixIconButton.Shape>
  }
}


