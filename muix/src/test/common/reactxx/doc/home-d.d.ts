declare namespace DocHome {
  type ExpandedPanelShape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'header' | 'content'> & ReactXX.ShapeTexts<'icon'>
    animation: {
      openClose: ReactXX.ShapeViews<'content'> & ReactXX.ShapeTexts<'icon'>
    }
    props: { title: React.ReactNode }
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    DocHome$ExpandedPanelShape?: PartialSheetX<DocHome.ExpandedPanelShape>
  }
}
