declare namespace MuixScrollView {

  type ClassKeyView = 'root'

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeScrollViews<'root'> & ReactXX.ShapeViews<'contentContainerStyle'>
    style: ReactN.ViewStyle
    props: { horizontal?: boolean } 
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiScrollView?: Muix.SheetXOrCreator<MuixScrollView.Shape>
  }
}

