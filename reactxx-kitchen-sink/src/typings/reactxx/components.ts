export { }

declare global {
  namespace ReactXX {

    const enum CompNames {
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

    type TextShape = OverwriteShape<{
      common: ShapeTexts<'root' | 'singleLineStyle'>
      style: ReactN.TextStyle,
      web: 'pressable'
      props: { numberOfLines?: number } & OnPressX
      propsWeb: React.HTMLAttributes<HTMLSpanElement> & { url?: string }
      propsNative: ReactN.TextProperties
      nameType: CompNames.Text | CompNames.AnimatedText
    }>

    type ViewShape = OverwriteShape<{
      common: ShapeViews<'root'>
      style: ReactN.ViewStyle,
      props: OnPressAllX
      propsWeb: React.HTMLAttributes<HTMLDivElement>
      propsNative: ReactN.ViewProperties
      nameType: CompNames.View | CompNames.AnimatedView
    }>

    type IconShape = OverwriteShape<{
      common: ShapeTexts<'root'>
      style: ReactN.TextStyle,
      web: 'pressable'
      props: { data: string } & OnPressX
      propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
      //from node_modules\@types\expo\index.d.ts, BaseIconProps
      propsNative: {
        size?: number
        color?: string
      }
      nameType: CompNames.Icon | CompNames.AnimatedIcon
    }>

    type ScrollViewShape = OverwriteShape<{
      common: ShapeScrollViews<'root' | 'container'>
      web: 'rootHorizontal' | 'containerHorizontal'
      style: ReactN.ScrollViewStyle
      props: {
        horizontal?: boolean
      }
      propsWeb: React.HTMLAttributes<HTMLDivElement>
      propsNative: ReactN.ScrollViewProperties
      nameType: CompNames.ScrollView | CompNames.AnimatedScrollView
    }>

    interface Shapes {
      [CompNames.Text]?: TextShape
      [CompNames.AnimatedText]?: TextShape
      [CompNames.View]?: ViewShape
      [CompNames.AnimatedView]?: ViewShape
      [CompNames.Icon]?: IconShape
      [CompNames.AnimatedIcon]?: IconShape
      [CompNames.ScrollView]?: ScrollViewShape
      [CompNames.AnimatedScrollView]?: ScrollViewShape
    }
  }
}