declare namespace testAnimation {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeTexts<'root' | 'drawer'>
    animation: {
      animDrawer: Muix.ShapeViews<'slide'> & Muix.ShapeTexts<'opacity'>
    }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}