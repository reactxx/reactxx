declare namespace MuiView {

  type ClassKey = 'root' 

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKey, ReactN.ViewStyle>
  }>

}