declare namespace testAnimation {

  const enum Consts {
    Drawer = 'test$animation$drawer'
  }

  type Shape = ReactXX.OverwriteShape<{
    props: {
      renderContent?: () => JSX.Element
      renderDrawer?: () => JSX.Element
    }
    mediaq: 'mobile' | 'tablet' | 'desktop'
    common: ReactXX.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content' | 'mobile' | 'tablet' | 'desktop' | 'openButtonContainer'> & ReactXX.ShapeTexts<'openButton' | 'closeButton'>
    animation: {
      mobile: ReactXX.ShapeViews<'drawer' | 'backDrop'>
      tablet: ReactXX.ShapeViews<'drawer' | 'content'>
    },
    themePar: {
      drawerWidths: [number, number, number] //drawer width for Mobile, tablet and desktop
      breakpoints: [number, number ] //media query breakpoints between mobile x tablet and tablet x desktop
      animationDuration: number //animation duration for mobile and tablet
    },
    nameType: Consts.Drawer
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    TestStyles?: ReactXX.PartialSheetX<testStyles.Shape>
  }
}