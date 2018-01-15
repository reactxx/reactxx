declare namespace MuixHidden {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'style'>
    props: Partial<OmitFrom<Muix.HiddenProps, 'classes' | 'style' | 'className'>>
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuixHidden?: Muix.SheetXOrCreator<Shape>
  }
}


