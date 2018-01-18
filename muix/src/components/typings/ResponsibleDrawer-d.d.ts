declare namespace MuixResponsibleDrawer {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root' | 'appFrame' | 'appBar' | 'navIconHide' | 'drawerHeader' | 'drawerPaper' | 'content'>
    propsNative: {}
    propsWeb: {}
  }>
}

declare namespace Muix {
  interface SheetsX {
    MuiResponsiveDrawer?: Muix.SheetXOrCreator<Shape>
  }
}

