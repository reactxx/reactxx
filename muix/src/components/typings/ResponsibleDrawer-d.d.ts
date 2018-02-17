declare namespace MuixResponsibleDrawer {

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'appFrame' | 'appBar' | 'navIconHide' | 'drawerHeader' | 'drawerPaper' | 'content'>
    propsNative: {}
    propsWeb: {}
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    MuiResponsiveDrawer?: Muix.SheetXOrCreator<MuixResponsibleDrawer.Shape>
  }
}

