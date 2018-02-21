declare namespace MuixHidden {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    props: Muix.HiddenProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiHidden?: ReactXX.PartialSheetX<MuixHidden.Shape>
  }
}


