declare namespace MuixAppBar {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'style'>
    props: Partial<OmitFrom<Muix.AppBarProps, 'classes' | 'style' | 'className'>>
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiDrawer?: Muix.SheetXOrCreator<Shape>
  }
}


