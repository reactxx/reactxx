declare namespace MuixHidden {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root'>
    props: Muix.HiddenProps
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiHidden?: Muix.SheetXOrCreator<Shape>
  }
}


