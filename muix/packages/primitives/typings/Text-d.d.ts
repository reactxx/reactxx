declare namespace MuixText {
  type ClassKeyText = 'root'

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeTexts<'root'>
    style: ReactN.TextStyle
    props: ReactXX.OnPressAllWeb
    propsNative: ReactN.TextProperties
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiText?: ReactXX.PartialSheetX<MuixText.Shape>
  }
  interface Shapes {
    MuiText?: MuixText.Shape
  }
}

