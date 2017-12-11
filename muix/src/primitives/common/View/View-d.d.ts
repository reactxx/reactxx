declare namespace MuiView {

  type ClassKey = 'root' 

  type Shape = Overwrite<Mui.EmptyShape, {
    common: Record<ClassKey, RN.ViewStyle>
  }>

}