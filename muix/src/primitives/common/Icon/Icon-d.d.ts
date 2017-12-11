declare namespace MuiIcon {

  type Colors = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';
  type ClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type Shape = Overwrite<Mui.EmptyShape, {
    common: Record<ClassKey, Mui.RNIconStyle>
    style: Mui.RNIconStyle
    props: {
      color?: Colors
      children?: MDI.icons
    }
    propsWeb: {}
    propsNative: {}
  }>

}