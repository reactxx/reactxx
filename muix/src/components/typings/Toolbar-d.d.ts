declare namespace MuixToolbar {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root'>
    props: Muix.ToolbarProps
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiToolbar?: Muix.SheetXOrCreator<Shape>
  }
}


