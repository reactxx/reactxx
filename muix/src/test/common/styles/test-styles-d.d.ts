declare namespace testStyles {
  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root' | 'primary' | 'secondary'> & Muix2.ShapeTexts<'label'>
    props: { primary?: boolean }
  }>
}

declare namespace Muix2 {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}