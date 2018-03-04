declare namespace testAnimation {

  const enum Consts {
    Drawer = 'test$animation$drawer'
  }

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
    },
    componentsTheme: {
      drawerWidths: [number, number, number],
      animationDuration: number,
    },
    nameType: Consts.Drawer,
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    TestStyles?: ReactXX.PartialSheetX<testStyles.Shape>
  }
}