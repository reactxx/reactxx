declare namespace testAnimation {
  type Shape = Muix.OverwriteShape<{
    props: {
      mobile?: boolean
      tablet?: boolean
      desktop?: boolean
    }
    common: Muix2.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content' | 'mobile' | 'tablet' | 'desktop'> & Muix2.ShapeTexts<'openButton' | 'closeButton'>
    animation: {
      mobile: Muix2.ShapeViews<'drawer' | 'backDrop'>,
      tablet: Muix2.ShapeViews<'drawer' | 'content'>,
    }
  }>
}

declare namespace Muix2 {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}