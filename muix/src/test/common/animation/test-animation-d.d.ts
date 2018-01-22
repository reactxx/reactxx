declare namespace testAnimation {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content'> 
    animation: {
      mobile: Muix.ShapeViews<'drawer' | 'backDrop'>
    }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}