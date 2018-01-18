declare namespace MuixAppBar {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root'>
    props: Muix.AppBarProps
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiAppBar?: Muix.SheetXOrCreator<Shape>
  }
}


