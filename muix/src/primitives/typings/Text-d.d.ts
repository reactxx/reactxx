declare namespace MuixText {
  type ClassKeyText = 'root'

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeTexts<'root'>
    style: ReactN.TextStyle
    props: Muix2.TOnClickWeb
    propsNative: ReactN.TextProperties
  }>

}

declare namespace Muix2 {
  interface SheetsX {
    MuiText?: Muix.SheetXOrCreator<MuixText.Shape>
  }
}

