declare namespace MuiScrollView {

  type ClassKeyView = 'root' 

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKeyView, ReactN.ViewStyle>
    native: {}
    web: ''
    style: ReactN.ViewStyle
    props: {}
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }>

}