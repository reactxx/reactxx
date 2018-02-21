declare namespace MuixView {
  export type ClassKey = 'root'

  export type Shape = ReactXX.OverwriteShape<{
    props: ReactXX.OnPressAllWeb
    common: ReactXX.ShapeViews<'root'>
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiView?: ReactXX.PartialSheetX<MuixView.Shape>
    MuiAnimatedView?: ReactXX.PartialSheetX<MuixView.Shape>
  }
}

