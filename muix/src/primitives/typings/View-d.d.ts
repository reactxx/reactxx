declare namespace MuixView {
  export type ClassKey = 'root'

  export type Shape = Muix.OverwriteShape<{
    props: ReactXX.OnPressAllWeb
    common: ReactXX.ShapeViews<'root'>
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiView?: Muix.SheetXOrCreator<MuixView.Shape>
    MuiAnimatedView?: Muix.SheetXOrCreator<MuixView.Shape>
  }
}

