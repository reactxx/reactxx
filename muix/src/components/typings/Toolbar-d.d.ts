declare namespace MuixToolbar {

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.ToolbarProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiToolbar?: Muix.SheetXOrCreator<MuixToolbar.Shape>
  }
}


