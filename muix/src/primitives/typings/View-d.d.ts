declare namespace MuixView {
  export type ClassKey = 'root'

  export type Shape = Muix.OverwriteShape<{
    props: Prim5s.TOnClickWeb
    common: Prim5s.ShapeViews<'root'>
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiView?: Muix.SheetXOrCreator<MuixView.Shape>
    MuiAnimatedView?: Muix.SheetXOrCreator<MuixView.Shape>
  }
}

