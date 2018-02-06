declare namespace MuixToolbar {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root'>
    props: Muix.ToolbarProps
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiToolbar?: Muix.SheetXOrCreator<MuixToolbar.Shape>
  }
}


