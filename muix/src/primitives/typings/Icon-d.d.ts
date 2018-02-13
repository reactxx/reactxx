declare namespace MuixIcon {

  type Colors = 'inherit' | 'secondary' | 'action' | 'disabled' | 'error' | 'primary'

  interface IconProperties {
    color?: Colors
    children?: MuixIcons
  }

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeTexts<'root' | 'colorSecondary' | 'colorAction' | 'colorDisabled' | 'colorError' | 'colorPrimary'>
    style: ReactN.TextStyle
    props: IconProperties & Prim5s.OnPressAllWeb
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    MuiIcon?: Muix.SheetXOrCreator<MuixIcon.Shape>
  }
}

