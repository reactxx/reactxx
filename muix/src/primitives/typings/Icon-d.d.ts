declare namespace MuixIcon {

  type Colors = 'inherit' | 'secondary' | 'action' | 'disabled' | 'error' | 'primary'

  interface IconProperties {
    color?: Colors
    children?: MuixIcons
  }

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeTexts<'root' | 'colorSecondary' | 'colorAction' | 'colorDisabled' | 'colorError' | 'colorPrimary'>
    style: ReactN.TextStyle
    props: IconProperties & ReactXX.OnPressAllWeb
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    MuiIcon?: Muix.SheetXOrCreator<MuixIcon.Shape>
  }
}

