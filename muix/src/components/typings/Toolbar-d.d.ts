declare namespace MuixToolbar {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.ToolbarProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiToolbar?: ReactXX.PartialSheetX<MuixToolbar.Shape>
  }
}


