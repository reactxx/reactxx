declare namespace testStyles {
  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'primary' | 'secondary'> & ReactXX.ShapeTexts<'label'>
    props: { primary?: boolean }
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    TestStyles?: ReactXX.PartialSheetX<testStyles.Shape>
  }
}