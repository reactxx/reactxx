declare namespace Primitives {
  type PropsLow<T extends Muix.Ruleset, P extends {}, W extends {} = React.HTMLAttributes<HTMLDivElement>> = {
    className?: T
    style?: T
    $native?: Partial<OmitFrom<P, 'contentContainerStyle'>>
    $web?: W
  }

  type ViewProperties = ReactN.ViewProperties & { onPress?: ReactN.TextProperties['onPress'] }

  type Web<W extends {} = React.HTMLAttributes<HTMLDivElement>> = PropsLow<React.CSSProperties, {}, W>
  type View = PropsLow<ReactN.ViewStyle, ViewProperties> 
  type ViewX = PropsLow<ReactN.ViewStyle | React.CSSProperties, ViewProperties> 
  type Text = PropsLow<ReactN.TextStyle, ReactN.TextProperties>
  type TextX = PropsLow<ReactN.TextStyle | React.CSSProperties, ReactN.TextProperties>
  type ScrollView = PropsLow<ReactN.ScrollViewStyle, ReactN.ScrollViewProperties> & { contentContainerStyle?: ReactN.ViewStyle }
  type ScrollViewX = PropsLow<ReactN.ScrollViewStyle | React.CSSProperties, ReactN.ScrollViewProperties> & { contentContainerStyle?: ReactN.ViewStyle | React.CSSProperties }
  type Icon = PropsLow<ReactN.TextStyle, { color?: string; size?: number }> & { data?: string }
  type IconX = PropsLow<ReactN.TextStyle | React.CSSProperties, { color?: string; size?: number }> & { data?: string }
  type Typography = PropsLow<ReactN.TextStyle, ReactN.TextProperties> & { $noWrapStyle, $type: string }
  type TypographyX = PropsLow<ReactN.TextStyle | React.CSSProperties, ReactN.TextProperties> 

}

