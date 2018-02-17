declare namespace testStyles {
  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'primary' | 'secondary'> & ReactXX.ShapeTexts<'label'>
    props: { primary?: boolean }
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}