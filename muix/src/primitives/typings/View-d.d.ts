declare namespace MuixView {
  export type ClassKey = 'root'

  export type Shape = Overwrite<Muix.DefaultEmptyShape, {
    props: Muix.TOnClickWeb
    common: Muix.ShapeViews<'root'>
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiView?: Muix.SheetXOrCreator<MuixView.Shape>
    MuiAnimatedView?: Muix.SheetXOrCreator<MuixView.Shape>
  }
}

