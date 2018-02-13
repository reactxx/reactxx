declare namespace DocHome {
  type ExpandedPanelShape = Prim5s.OverwriteShape<{
    common: Prim5s.ShapeViews<'root' | 'header' | 'content' | 'closeIcon'>
    props: { title: React.ReactNode }
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    DocHome$ExpandedPanelShape?: PartialSheetX<DocHome.ExpandedPanelShape>
  }
}
