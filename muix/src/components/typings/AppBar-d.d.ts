declare namespace MuixAppBar {

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.AppBarProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiAppBar?: Muix.SheetXOrCreator<MuixAppBar.Shape>
  }
}


