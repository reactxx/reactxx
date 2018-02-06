declare namespace MuixDivider {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root'>
    props: Muix.DividerProps
    propsWeb: React.HTMLAttributes<HTMLHRElement>
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    MuiDivider?: Muix.SheetXOrCreator<MuixDivider.Shape>
  }
}


