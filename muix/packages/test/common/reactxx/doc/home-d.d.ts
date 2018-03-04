declare namespace DocHome {

  const enum CompNames {
    ExpandPanel = 'DocHome$ExpandedPanelShape'
  }

  type ExpandedPanelShape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'header' | 'content'> & ReactXX.ShapeTexts<'icon' | 'headerLabel'>
    animation: {
      openClose: ReactXX.ShapeViews<'content'> & ReactXX.ShapeTexts<'icon'>
    }
    props: { title: React.ReactNode }
    nameType: CompNames.ExpandPanel
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    [DocHome.CompNames.ExpandPanel]?: PartialSheetX<DocHome.ExpandedPanelShape>
  }
}
