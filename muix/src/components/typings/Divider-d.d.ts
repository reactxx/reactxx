declare namespace MuixDivider {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'style'>
    props: Partial<OmitFrom<Muix.DividerProps, 'classes' | 'style' | 'className'>>
    propsWeb: React.HTMLAttributes<HTMLHRElement>
  }>
}

declare namespace Muix {
  interface SheetsX {
    MuixDivider?: Muix.SheetXOrCreator<Shape>
  }
}


