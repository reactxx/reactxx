import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import { rulesetsToClassNames } from './fela'
import { sheetCreator } from '../common/index'
import { textSheet } from '../common/components'

const viewStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,

  position: 'relative',
}

const view: React.SFC<PrimComps.Web> = props => {
  const { style, className, $web, children } = props
  return <div className={rulesetsToClassNames(viewStyle, className)} style={style} {...$web} children={children} />
}

const icon: React.SFC<PrimComps.Web<SVGSVGElement> & { data: MuixIcons }> = props => {
  const { style, className, $web, data, children } = props
  const { viewBox = '0 0 24 24', ...other } = $web
  if (className && className.fontSize) { className.height = className.width = className.fontSize; delete className.fontSize }
  if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
  return <svg className={rulesetsToClassNames(className, { fill: 'currentColor' })} style={style} focusable='false' viewBox={viewBox} {...other as any}>
    {children ? children : <path d={data} />}
  </svg>
}

export const text: Prim5s.CodeSFCWeb<Prim5s.TextShape> = props => {
  const { style, classes, className, numberOfLines, onClick, mergeRulesetWithCascading, flip, theme, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, onClick && classes.pressable, numberOfLines === 1 && classes.singleLineStyle, className)
  return <div className={'base-text ' + rulesetsToClassNames(rootStyle)} style={style} onClick={onClick} {...rest} />
}

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
const scrollViewStyles = {
  base: {
    flexBasis: 0,
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    // Enable hardware compositing in modern browsers.
    // Creates a new layer with its own backing surface that can significantly
    // improve scroll performance.
    transform: [{ translateZ: 0 }]
  } as React.CSSProperties,
  container: {
  } as React.CSSProperties,
  baseHorizontal: {
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden'
  } as React.CSSProperties,
  contentContainerHorizontal: {
    flexDirection: 'row'
  } as React.CSSProperties
}

const scrollView: React.SFC<PrimComps.Web & { horizontal?: boolean; contentContainerStyle?: React.CSSProperties }> = props => {
  const { style, className, horizontal, children, contentContainerStyle, $web } = props
  checkChildLayoutProps(style); checkChildLayoutProps(className)
  return <div className={rulesetsToClassNames(viewStyle, scrollViewStyles.base, horizontal && scrollViewStyles.baseHorizontal, className)} style={style} {...$web}>
    <div className={rulesetsToClassNames(viewStyle, scrollViewStyles.container, contentContainerStyle, horizontal && scrollViewStyles.contentContainerHorizontal)}>
      {children}
    </div>
  </div>
}

const checkChildLayoutProps = (css: React.CSSProperties) => {
  if (/*process.env.NODE_ENV === 'production' ||*/ !css) return
  const childLayoutProps = ['alignItems', 'justifyContent'].filter(prop => css && css[prop] !== undefined)
  warning(childLayoutProps.length === 0, `ScrollView child layout (${JSON.stringify(childLayoutProps)}) must be applied through the contentContainerStyle prop.`)
}

export const Icon = icon as React.SFC<PrimComps.IconX>
export const View = view as React.SFC<PrimComps.ViewX>
export const ScrollView = scrollView as React.SFC<PrimComps.ScrollViewX>
export const AnimatedView = View

