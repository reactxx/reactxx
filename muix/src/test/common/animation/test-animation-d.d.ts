declare namespace testAnimation {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'drawer' | 'backDrop'> & Muix.ShapeTexts<'button'>
    animation: {
      animDrawer: Muix.ShapeViews<'slide' | 'opacity'>
    }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}