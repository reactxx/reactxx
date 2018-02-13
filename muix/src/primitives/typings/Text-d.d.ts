declare namespace MuixText {
  type ClassKeyText = 'root'

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeTexts<'root'>
    style: ReactN.TextStyle
    props: Prim5s.OnPressAllWeb
    propsNative: ReactN.TextProperties
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiText?: Muix.SheetXOrCreator<MuixText.Shape>
  }
}

