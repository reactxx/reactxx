declare namespace MuixHidden {

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.HiddenProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiHidden?: Muix.SheetXOrCreator<MuixHidden.Shape>
  }
}


