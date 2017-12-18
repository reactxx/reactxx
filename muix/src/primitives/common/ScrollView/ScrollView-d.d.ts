declare namespace MuiScrollView {

  type ClassKeyView = 'root' 

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKeyView, ReactN.ViewStyle>
    style: ReactN.ViewStyle
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }>

}