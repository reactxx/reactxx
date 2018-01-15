declare namespace MuixIcon {

  type Colors = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary'

  interface IconProperties {
    color?: Colors
    children?: MuixIcons
  }

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeTexts<'root' | 'style' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'>
    style: ReactN.TextStyle
    props: IconProperties & Muix.TOnClickWeb
  }>
}

declare namespace Muix {
  interface SheetsX {
    MuiIcon?: Muix.SheetXOrCreator<MuixIcon.Shape>
  }
}

