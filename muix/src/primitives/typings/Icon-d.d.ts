declare namespace MuixIcon {

  type Colors = 'inherit' | 'secondary' | 'action' | 'disabled' | 'error' | 'primary'

  interface IconProperties {
    color?: Colors
    children?: MuixIcons
  }

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeTexts<'root' | 'colorSecondary' | 'colorAction' | 'colorDisabled' | 'colorError' | 'colorPrimary'>
    style: ReactN.TextStyle
    props: IconProperties & Muix.TOnClickWeb
  }>
}

declare namespace Muix {
  interface SheetsX {
    MuiIcon?: Muix.SheetXOrCreator<MuixIcon.Shape>
  }
}

