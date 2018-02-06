declare namespace MuixHidden {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root'>
    props: Muix.HiddenProps
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiHidden?: Muix.SheetXOrCreator<MuixHidden.Shape>
  }
}


