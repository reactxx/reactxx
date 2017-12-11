declare namespace MuiText {

  type ClassKeyText = 'root' 

  type Shape = Overwrite<Mui.EmptyShape, {
    common: Record<ClassKeyText, RN.TextStyle>
    style: RN.TextStyle
    propsNative: RN.TextProperties

  }>

}