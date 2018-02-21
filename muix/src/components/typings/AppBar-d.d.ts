declare namespace MuixAppBar {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.AppBarProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiAppBar?: ReactXX.PartialSheetX<MuixAppBar.Shape>
  }
}


