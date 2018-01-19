declare namespace testStyles {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'primary' | 'secondary'> & Muix.ShapeTexts<'label'>
    props: { primary?: boolean }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}