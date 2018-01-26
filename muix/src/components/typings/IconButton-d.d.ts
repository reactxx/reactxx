declare namespace MuixIconButton {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root'>
    props: Muix.IconButtonProps
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiIconButton?: Muix.SheetXOrCreator<Shape>
  }
}


