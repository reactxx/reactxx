declare namespace MuixResponsibleDrawer {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root' | 'appFrame' | 'appBar' | 'navIconHide' | 'drawerHeader' | 'drawerPaper' | 'content'>
    propsNative: {}
    propsWeb: {}
  }>
}

declare namespace Muix2 {
  interface SheetsX {
    MuiResponsiveDrawer?: Muix.SheetXOrCreator<MuixResponsibleDrawer.Shape>
  }
}

