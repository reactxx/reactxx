declare namespace MuixIconButton {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root'>
    props: Muix.IconButtonProps
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiIconButton?: Muix.SheetXOrCreator<MuixIconButton.Shape>
  }
}


