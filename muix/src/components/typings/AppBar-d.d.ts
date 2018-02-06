declare namespace MuixAppBar {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root'>
    props: Muix.AppBarProps
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiAppBar?: Muix.SheetXOrCreator<MuixAppBar.Shape>
  }
}


