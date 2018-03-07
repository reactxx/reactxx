declare namespace testAnimation {

  const enum Consts {
    Drawer = 'test$animation$drawer'
  }

  interface RenderProps {
    style: ReactXX.RulesetX
    iconData: string,
    onPress: ReactXX.MouseEvent
  }

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content' | 'mobile' | 'tablet' | 'desktop' > & ReactXX.ShapeTexts<'openButton' | 'closeButton'>
    props: {
      //renderContent: (props: RenderProps) => JSX.Element
      drawer: JSX.Element
    }
    mediaq: 'mobile' | 'tablet' | 'desktop'
    animation: {
      mobile: ReactXX.ShapeViews<'drawer' | 'backDrop'>
      tablet: ReactXX.ShapeViews<'drawer' | 'content'>
    },
    themePar: { //type of parameter
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