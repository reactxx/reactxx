declare namespace MuixText {
  type ClassKeyText = 'root'

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeTexts<'root'>
    style: ReactN.TextStyle
    props: Muix.TOnClickWeb
    propsNative: ReactN.TextProperties
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiText?: Muix.SheetXOrCreator<MuixText.Shape>
  }
}

