declare namespace MuixTypography{
  //type ClassKey = Muix.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent' | 'colorPrimary' | 'colorError'

  type Shape = Muix.OverwriteShape<{
    common: ReactXX.ShapeTexts<Muix.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorPrimary' | 'colorError'> & { noWrap?: any /*ReactN.TextProperties*/ }
    style: ReactN.TextStyle
    props: Muix.TypographyProps
    /*{
      align?: Muix.PropTypes.Alignment
      color?: Muix.PropTypes.Color | 'secondary' | 'error'
      gutterBottom?: boolean
      noWrap?: boolean
      paragraph?: boolean
      type?: Muix.TypographyClassKey
    }*/
    propsNative: ReactN.TextProperties
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiTypography?: Muix.SheetXOrCreator<MuixTypography.Shape>
  }
}

