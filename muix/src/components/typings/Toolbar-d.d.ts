declare namespace MuixToolbar {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root'>
    props: Muix.ToolbarProps
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiToolbar?: Muix.SheetXOrCreator<MuixToolbar.Shape>
  }
}


