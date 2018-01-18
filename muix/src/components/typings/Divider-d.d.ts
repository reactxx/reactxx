declare namespace MuixDivider {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root'>
    props: Muix.DividerProps
    propsWeb: React.HTMLAttributes<HTMLHRElement>
  }>
}

declare namespace Muix {
  interface SheetsX {
    MuiDivider?: Muix.SheetXOrCreator<Shape>
  }
}


