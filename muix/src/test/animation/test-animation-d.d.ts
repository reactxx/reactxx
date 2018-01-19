declare namespace testAnimation {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    animation: {
      root: Muix.ShapeViews<'anim1'> & Muix.ShapeTexts<'anim2'>
    },
    props: { primary?: boolean }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}