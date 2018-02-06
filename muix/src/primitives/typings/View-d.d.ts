declare namespace MuixView {
  export type ClassKey = 'root'

  export type Shape = Muix.OverwriteShape<{
    props: Muix2.TOnClickWeb
    common: Muix2.ShapeViews<'root'>
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiView?: Muix.SheetXOrCreator<MuixView.Shape>
    MuiAnimatedView?: Muix.SheetXOrCreator<MuixView.Shape>
  }
}

