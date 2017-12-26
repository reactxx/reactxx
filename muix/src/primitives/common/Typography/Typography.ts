export type ClassKey = Mui.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent' | 'colorPrimary' | 'colorError'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  common: Record<ClassKey, ReactN.TextStyle> & { noWrap?: any /*ReactN.TextProperties*/ }
  style: ReactN.TextStyle
  props: {
    align?: Mui.PropTypes.Alignment
    color?: Mui.PropTypes.Color | 'secondary' | 'error'
    gutterBottom?: boolean
    noWrap?: boolean
    paragraph?: boolean
    type?: Mui.TypographyClassKey
  }
  propsNative: ReactN.TextProperties
}>
