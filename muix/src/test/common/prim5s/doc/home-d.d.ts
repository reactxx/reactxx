declare namespace DocHome {
  type ExpandedPanelShape = Prim5s.OverwriteShape<{
    common: Prim5s.ShapeViews<'root'>
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    DocHome$ExpandedPanelShape?: SheetOrCreator<DocHome.ExpandedPanelShape>
  }
}
