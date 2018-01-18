declare namespace MuixScrollView {

  type ClassKeyView = 'root'

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeScrollViews<'root' > & Muix.ShapeViews<'contentContainerStyle'>
    style: ReactN.ViewStyle
    props: { horizontal?: boolean } 
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiScrollView?: Muix.SheetXOrCreator<MuixScrollView.Shape>
  }
}

