declare namespace MuiScrollView {

  type ClassKeyView = 'root' 

  type Shape = Overwrite<Mui.EmptyShape, {
    common: Record<ClassKeyView, RN.ViewStyle>
    native: {}
    web: ''
    style: RN.ViewStyle
    props: {}
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: RN.ViewProperties
  }>

}