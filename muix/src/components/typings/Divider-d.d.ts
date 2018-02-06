declare namespace MuixDivider {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root'>
    props: Muix.DividerProps
    propsWeb: React.HTMLAttributes<HTMLHRElement>
  }>
}

declare namespace Muix2 {
  interface SheetsX {
    MuiDivider?: Muix.SheetXOrCreator<MuixDivider.Shape>
  }
}


