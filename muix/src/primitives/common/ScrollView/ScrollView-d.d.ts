declare namespace MuiScrollView {

  type ClassKeyView = 'root' 

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKeyView, RN.ViewStyle>
    native: {}
    web: ''
    style: RN.ViewStyle
    props: {}
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: RN.ViewProperties
  }>

}