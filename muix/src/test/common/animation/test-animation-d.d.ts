declare namespace testAnimation {
  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    props: {
      mobile?: boolean
      tablet?: boolean
      desktop?: boolean
    }
    common: Muix.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content' | 'mobile' | 'tablet' | 'desktop'> & Muix.ShapeTexts<'openButton' | 'closeButton'>
    animation: {
      mobile: Muix.ShapeViews<'drawer' | 'backDrop'>,
      tablet: Muix.ShapeViews<'drawer' | 'content'>,
    }
  }>
}

declare namespace Muix {
  interface SheetsX {
    TestStyles?: Muix.SheetXOrCreator<testStyles.Shape>
  }
}