import ReactN from 'react-native'

import { SheetsT } from 'reactxx-typings'

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

  export type TextShape = SheetsT.OverwriteShape<{
    common: SheetsT.ShapeTexts<'root' | 'singleLineStyle'>
    style: ReactN.TextStyle,
    web: 'pressable'
    props: { numberOfLines?: number } & SheetsT.OnPressX
    propsWeb: React.HTMLAttributes<HTMLSpanElement> & { url?: string }
    propsNative: ReactN.TextProperties
    nameType: CompNames.Text | CompNames.AnimatedText
  }>

  export type ViewShape = SheetsT.OverwriteShape<{
    common: SheetsT.ShapeViews<'root'>
    style: ReactN.ViewStyle,
    props: SheetsT.OnPressAllX
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
    nameType: CompNames.View | CompNames.AnimatedView
  }>

  export type IconShape = SheetsT.OverwriteShape<{
    common: SheetsT.ShapeTexts<'root'>
    style: ReactN.TextStyle,
    web: 'pressable'
    props: { data: string } & SheetsT.OnPressX
    propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
    //from node_modules\@types\expo\index.d.ts, BaseIconProps
    propsNative: {
      size?: number
      color?: string
    }
    nameType: CompNames.Icon | CompNames.AnimatedIcon
  }>

  export type ScrollViewShape = SheetsT.OverwriteShape<{
    common: SheetsT.ShapeScrollViews<'root' | 'container'>
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
