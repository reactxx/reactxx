import ReactN from 'react-native'

export namespace TBasic {

  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  export type MouseEvent = (event?: React.MouseEvent<Element>) => void

  export interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }

  //*************** cross platform ruleset for web and native

  export type RulesetX<T extends RulesetNative = ReactN.TextStyle> =
    commonRules<T> & // native rules which are compatible with web
    {
      $native?: T // native specific rules
      $web?: RulesetWeb // web specific rules
    } 

  // rule names, common for native and web
  export type commonRuleNames<T extends RulesetNative> = keyof React.CSSPropertiesLow & keyof T
  // native rules, which are compatible with web
  export type commonRules<T extends RulesetNative> = TakeFrom<T, commonRuleNames<T>>

  export type ViewRulesetCommonX = commonRules<ReactN.ViewStyle>
  export type TextRulesetCommonX = commonRules<ReactN.TextStyle>
  export type ScrollViewRulesetCommonX = commonRules<ReactN.ScrollViewStyle>
  export type ImageRulesetCommonX = commonRules<ReactN.ImageStyle>

  export type ViewRulesetX = RulesetX<ReactN.ViewStyle>
  export type TextRulesetX = RulesetX<ReactN.TextStyle>

  //******************** Platform specific ruleset
  export type RulesetWeb = React.CSSProperties //??? https://github.com/programbo/cssproperties/blob/master/css-properties.d.ts
  export type RulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle
  export type Ruleset = RulesetNative | RulesetWeb

  //*************** 
  export interface Shape {
    style: ReactN.ViewStyle // for native: export type of component style property (for web, style has always React.CSSProperties type)
    props: {} //common (web and native) props
    propsNative: {} //native only props 
    propsWeb: React.HTMLAttributes<Element>//web only props
  }
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']

  export type PropsX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
    style?: RulesetX<getStyle<R>>
    className?: RulesetX<getStyle<R>>
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    ignore?: boolean
  }>>

  export type CodePropsWeb<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsWeb<R>, {
    className: RulesetWeb
    style: RulesetWeb
    mergeRulesetWithOverrides
    classes
    theme
    animations
    mediaq
  } & OnPressAllWeb>
  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  export type CodePropsNative<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsNative<R>, {
    className: getStyle<R>
    style: getStyle<R>
    classes
    theme
    mergeRulesetWithOverrides
    animations
    mediaq
  } & OnPressAllNative>
  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  export type TextShape = {
    style: ReactN.TextStyle,
    props: { numberOfLines?: number; url?: string } 
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }

  export type ViewShape = {
    style: ReactN.ViewStyle,
    props: OnPressAllX
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }

  export type IconShape = {
    style: ReactN.TextStyle,
    props: { data: string } 
    propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
    propsNative: {
      size?: number
      color?: string
    }
  }

  export type ScrollViewShape = {
    style: ReactN.ScrollViewStyle
    props: {
      horizontal?: boolean
    }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
