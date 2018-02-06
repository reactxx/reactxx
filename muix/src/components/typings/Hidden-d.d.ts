declare namespace MuixHidden {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root'>
    props: Muix.HiddenProps
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiHidden?: Muix.SheetXOrCreator<MuixHidden.Shape>
  }
}


