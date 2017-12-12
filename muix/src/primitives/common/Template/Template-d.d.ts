declare namespace MuiTemplate {

  type ClassKeyView = 'root' 
  type ClassKeyText = 'text' 

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKeyView, RN.ViewStyle> & Record<ClassKeyText, RN.TextStyle>
    native: {}
    web: ''
    style: RN.ViewStyle
    props: {}
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: RN.ViewProperties
  }>

}