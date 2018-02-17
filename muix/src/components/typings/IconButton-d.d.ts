declare namespace MuixIconButton {

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.IconButtonProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiIconButton?: Muix.SheetXOrCreator<MuixIconButton.Shape>
  }
}


