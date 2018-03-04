declare namespace testAnimation {
  type Shape = ReactXX.OverwriteShape<{
    props: {
      mobile?: boolean
      tablet?: boolean
      desktop?: boolean
    }
    common: ReactXX.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content' | 'mobile' | 'tablet' | 'desktop'> & ReactXX.ShapeTexts<'openButton' | 'closeButton'>
    animation: {
      mobile: ReactXX.ShapeViews<'drawer' | 'backDrop'>,
      tablet: ReactXX.ShapeViews<'drawer' | 'content'>,
    }
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    TestStyles?: ReactXX.PartialSheetX<testStyles.Shape>
  }
}