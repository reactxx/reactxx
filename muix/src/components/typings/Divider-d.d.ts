declare namespace MuixDivider {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.DividerProps
    propsWeb: React.HTMLAttributes<HTMLHRElement>
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    MuiDivider?: ReactXX.PartialSheetX<MuixDivider.Shape>
  }
}


