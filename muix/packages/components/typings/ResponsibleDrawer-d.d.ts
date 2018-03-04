declare namespace MuixResponsibleDrawer {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root' | 'appFrame' | 'appBar' | 'navIconHide' | 'drawerHeader' | 'drawerPaper' | 'content'>
    propsNative: {}
    propsWeb: {}
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    MuiResponsiveDrawer?: ReactXX.PartialSheetX<MuixResponsibleDrawer.Shape>
  }
}

