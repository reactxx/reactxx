declare namespace MuixScrollView {

  type ClassKeyView = 'root'

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeScrollViews<'root'> & Muix2.ShapeViews<'contentContainerStyle'>
    style: ReactN.ViewStyle
    props: { horizontal?: boolean } 
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiScrollView?: Muix.SheetXOrCreator<MuixScrollView.Shape>
  }
}

