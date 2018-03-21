declare const enum CompNames {
    textClassName = 'reactxx-text',
    Text = 'ReactXX$Text',
    View = 'ReactXX$View',
    Icon = 'ReactXX$Icon',
    ScrollView = 'ReactXX$ScrollView',
    AnimatedView = 'ReactXX$AnimatedView',
    AnimatedIcon = 'ReactXX$AnimatedIcon',
    AnimatedText = 'ReactXX$AnimatedText',
    AnimatedScrollView = 'ReactXX$AnimatedScrollView',
  }

  //export type TextShape = TSheets.OverwriteShape<{
  //  common: TSheets.ShapeTexts<'root' | 'singleLineStyle'>
  //  web: 'pressable'
  //  style: ReactN.TextStyle,
  //  props: { numberOfLines?: number; url?: string  } & TSheets.OnPressX
  //  propsWeb: React.HTMLAttributes<HTMLSpanElement>
  //  propsNative: ReactN.TextProperties
  //  nameType: CompNames.Text | CompNames.AnimatedText
  //}>

  //export type ViewShape = TSheets.OverwriteShape<{
  //  common: TSheets.ShapeViews<'root'>
  //  style: ReactN.ViewStyle,
  //  props: TSheets.OnPressAllX
  //  propsWeb: React.HTMLAttributes<HTMLDivElement>
  //  propsNative: ReactN.ViewProperties
  //  nameType: CompNames.View | CompNames.AnimatedView
  //}>

  //export type IconShape = TSheets.OverwriteShape<{
  //  common: TSheets.ShapeTexts<'root'>
  //  style: ReactN.TextStyle,
  //  web: 'pressable'
  //  props: { data: string } & TSheets.OnPressX
  //  propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
  //  //from node_modules\@types\expo\index.d.ts, BaseIconProps
  //  propsNative: {
  //    size?: number
  //    color?: string
  //  }
  //  nameType: CompNames.Icon | CompNames.AnimatedIcon
  //}>

  //export type ScrollViewShape = TSheets.OverwriteShape<{
  //  common: TSheets.ShapeScrollViews<'root'> & TSheets.ShapeViews<'container'>
  //  web: 'rootHorizontal' | 'containerHorizontal'
  //  style: ReactN.ScrollViewStyle
  //  props: {
  //    horizontal?: boolean
  //  }
  //  propsWeb: React.HTMLAttributes<HTMLDivElement>
  //  propsNative: ReactN.ScrollViewProperties
  //  nameType: CompNames.ScrollView | CompNames.AnimatedScrollView
  //}>

  //export type TViewWeb = TSheets.CodeSFCWeb<TComps.ViewShape>

  //interface Shapes {
  //  [CompNames.Text]?: TextShape
  //  [CompNames.AnimatedText]?: TextShape
  //  [CompNames.View]?: ViewShape
  //  [CompNames.AnimatedView]?: ViewShape
  //  [CompNames.Icon]?: IconShape
  //  [CompNames.AnimatedIcon]?: IconShape
  //  [CompNames.ScrollView]?: ScrollViewShape
  //  [CompNames.AnimatedScrollView]?: ScrollViewShape
  //}

