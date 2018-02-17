declare namespace MuixDivider {

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.DividerProps
    propsWeb: React.HTMLAttributes<HTMLHRElement>
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    MuiDivider?: Muix.SheetXOrCreator<MuixDivider.Shape>
  }
}


