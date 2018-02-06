declare namespace MuixScrollView {

  type ClassKeyView = 'root'

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeScrollViews<'root'> & Prim5s.ShapeViews<'contentContainerStyle'>
    style: ReactN.ViewStyle
    props: { horizontal?: boolean } 
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiScrollView?: Muix.SheetXOrCreator<MuixScrollView.Shape>
  }
}

