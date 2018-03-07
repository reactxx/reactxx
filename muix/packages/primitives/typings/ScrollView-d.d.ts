declare namespace MuixScrollView {

  type ClassKeyView = 'root'

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeScrollViews<'root'> & ReactXX.ShapeViews<'contentContainerStyle'>
    style: ReactN.ViewStyle
    props: { horizontal?: boolean } 
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiScrollView?: ReactXX.PartialSheetX<MuixScrollView.Shape>
  }
  interface Shapes {
    MuiScrollView?: MuixScrollView.Shape
  }
}

