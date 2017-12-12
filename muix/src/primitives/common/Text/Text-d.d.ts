declare namespace MuiText {

  type ClassKeyText = 'root' 

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKeyText, ReactN.TextStyle>
    style: ReactN.TextStyle
    propsNative: ReactN.TextProperties

  }>

}