declare namespace MuixAppBar {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root'>
    props: Muix.AppBarProps
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiAppBar?: Muix.SheetXOrCreator<MuixAppBar.Shape>
  }
}


