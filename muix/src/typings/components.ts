//import { } from './theme'

export namespace CompsT {

  export const enum CompNames {
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

  export type TextShape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeTexts<'root' | 'singleLineStyle'>
    style: ReactN.TextStyle,
    web: 'pressable'
    props: { numberOfLines?: number } & ReactXX.OnPressX
    propsWeb: React.HTMLAttributes<HTMLSpanElement> & { url?: string }
    propsNative: ReactN.TextProperties
    nameType: CompNames.Text | CompNames.AnimatedText
  }>

  export type ViewShape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    style: ReactN.ViewStyle,
    props: ReactXX.OnPressAllX
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
    nameType: CompNames.View | CompNames.AnimatedView
  }>

  export type IconShape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeTexts<'root'>
    style: ReactN.TextStyle,
    web: 'pressable'
    props: { data: string } & ReactXX.OnPressX
    propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
    //from node_modules\@types\expo\index.d.ts, BaseIconProps
    propsNative: {
      size?: number
      color?: string
    }
    nameType: CompNames.Icon | CompNames.AnimatedIcon
  }>

  export type ScrollViewShape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeScrollViews<'root' | 'container'>
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
