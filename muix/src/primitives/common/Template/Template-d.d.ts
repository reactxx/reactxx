declare namespace MuiTemplate {

  type ClassKeyView = 'root' 
  type ClassKeyText = 'text' 

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKeyView, ReactN.ViewStyle> & Record<ClassKeyText, ReactN.TextStyle>
    native: {}
    web: null
    style: ReactN.ViewStyle
    props: {}
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }>

}