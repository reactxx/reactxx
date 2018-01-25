declare namespace MuixTypography{
  type ClassKey = Muix.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent' | 'colorPrimary' | 'colorError'

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeTexts<Muix.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent' | 'colorPrimary' | 'colorError'> & { noWrap?: any /*ReactN.TextProperties*/ }
    style: ReactN.TextStyle
    props: {
      align?: Muix.PropTypes.Alignment
      color?: Muix.PropTypes.Color | 'secondary' | 'error'
      gutterBottom?: boolean
      noWrap?: boolean
      paragraph?: boolean
      type?: Muix.TypographyClassKey
    }
    propsNative: ReactN.TextProperties
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiTypography?: Muix.SheetXOrCreator<MuixTypography.Shape>
  }
}

