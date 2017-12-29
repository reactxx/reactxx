declare namespace Icon {

  type Colors = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';
  type ClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type Shape = Overwrite<Mui.DefaultEmptyShape, {
    common: Record<ClassKey, Mui.RNIconStyle>
    style: Mui.RNIconStyle
    props: {
      color?: Colors
      children?: MuixIcons
    }
    propsWeb: {}
    propsNative: {}
  }>
}

declare namespace Mui {
  interface Shapes {
    MuiIcon?: Mui.SheetXOrCreator<Icon.Shape>
  }
}

