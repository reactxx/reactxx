declare namespace testAnimation {
  type Shape = Muix.OverwriteShape<{
    props: {
      mobile?: boolean
      tablet?: boolean
      desktop?: boolean
    }
    common: Prim5s.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content' | 'mobile' | 'tablet' | 'desktop'> & Prim5s.ShapeTexts<'openButton' | 'closeButton'>
    animation: {
      mobile: Prim5s.ShapeViews<'drawer' | 'backDrop'>,
      tablet: Prim5s.ShapeViews<'drawer' | 'content'>,
    }
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}