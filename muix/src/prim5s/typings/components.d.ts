declare namespace Prim5s {

  const enum CompNames {
    Text = 'BaseText',
    View = 'BaseView',
    Icon = 'BaseIcon',
    ScrollView = 'BaseScrollView',
    AnimatedView = 'BaseAnimatedView',
  }

  type TextShape = OverwriteShape<{
    common: ShapeTexts<'root' | 'singleLineStyle'>
    style: ReactN.TextStyle,
    web: 'pressable'
    props: { numberOfLines?: number } & OnClick
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }>
  type ViewShape = OverwriteShape<{
    common: ShapeViews<'root'>
    style: ReactN.ViewStyle,
    props: OnClick
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }>
  type AnimatedViewShape = ViewShape
  type IconShape = OverwriteShape<{
    common: ShapeTexts<'root'>
    style: ReactN.TextStyle,
    props: { data: string } & OnClick
    propsWeb: React.SVGAttributes<SVGElement>
    //from node_modules\@types\expo\index.d.ts, BaseIconProps
    propsNative: {
      size?: number
      color?: string
    }
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
  }>

  interface SheetsX {
    [CompNames.Text]?: SheetOrCreator<TextShape>
    [CompNames.View]?: SheetOrCreator<ViewShape>
    [CompNames.AnimatedView]?: SheetOrCreator<AnimatedViewShape>
    [CompNames.Icon]?: SheetOrCreator<IconShape>
    [CompNames.ScrollView]?: SheetOrCreator<ScrollViewShape>
  }
}
