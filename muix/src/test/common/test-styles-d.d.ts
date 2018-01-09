declare namespace testStyles {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'primary' | 'secondary'> & Muix.ShapeTexts<'label'>
    //native: Muix.ShapeViews<'rootNative'> & Muix.ShapeTexts<'textNative'>
    //web: 'webText'
    props: { primary?: boolean }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}