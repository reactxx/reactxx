declare namespace MuixIcon {

  type Colors = 'inherit' | 'secondary' | 'action' | 'disabled' | 'error' | 'primary'

  interface IconProperties {
    color?: Colors
    children?: MuixIcons
  }

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeTexts<'root' | 'colorSecondary' | 'colorAction' | 'colorDisabled' | 'colorError' | 'colorPrimary'>
    style: ReactN.TextStyle
    props: IconProperties & Muix2.TOnClickWeb
  }>
}

declare namespace Muix2 {
  interface SheetsX {
    MuiIcon?: Muix.SheetXOrCreator<MuixIcon.Shape>
  }
}

