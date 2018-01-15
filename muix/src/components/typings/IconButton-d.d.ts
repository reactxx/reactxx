declare namespace MuixIconButton {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'style'>
    props: Partial<OmitFrom<Muix.IconButtonProps, 'classes' | 'style' | 'className'>>
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuixIconButton?: Muix.SheetXOrCreator<Shape>
  }
}


