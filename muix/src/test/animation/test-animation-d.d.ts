declare namespace testAnimation {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeTexts<'root'>
    animation: {
      root: Muix.ShapeViews<'anim1'> & Muix.ShapeTexts<'anim2'>
    }
    props: { primary?: boolean }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}