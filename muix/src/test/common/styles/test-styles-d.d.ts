declare namespace testStyles {
  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root' | 'primary' | 'secondary'> & Prim5s.ShapeTexts<'label'>
    props: { primary?: boolean }
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}