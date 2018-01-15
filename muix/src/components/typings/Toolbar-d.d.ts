declare namespace MuixToolbar {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'style'>
    props: Partial<OmitFrom<Muix.ToolbarProps, 'classes' | 'style' | 'className'>>
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuixToolbar?: Muix.SheetXOrCreator<Shape>
  }
}


