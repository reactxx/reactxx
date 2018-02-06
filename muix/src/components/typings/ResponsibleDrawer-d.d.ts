declare namespace MuixResponsibleDrawer {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root' | 'appFrame' | 'appBar' | 'navIconHide' | 'drawerHeader' | 'drawerPaper' | 'content'>
    propsNative: {}
    propsWeb: {}
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    MuiResponsiveDrawer?: Muix.SheetXOrCreator<MuixResponsibleDrawer.Shape>
  }
}

