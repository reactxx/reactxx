declare namespace MuixIconButton {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root'>
    props: Muix.IconButtonProps
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiIconButton?: Muix.SheetXOrCreator<MuixIconButton.Shape>
  }
}


