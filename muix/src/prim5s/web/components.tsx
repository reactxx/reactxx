import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import { rulesetsToClassNames } from './fela'

const viewStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,

  position: 'relative',
}

const ViewWeb: React.SFC<PrimComps.Web> = props => {
  const { style, className, $web, children } = props
  return <div className={rulesetsToClassNames(viewStyle, className)} style={style} {...$web} children={children} />
}

const IconWeb: React.SFC<PrimComps.Web<SVGSVGElement> & { data: MuixIcons }> = props => {
  const { style, className, $web, data, children } = props
  const { viewBox = '0 0 24 24', ...other } = $web
  if (className && className.fontSize) { className.height = className.width = className.fontSize; delete className.fontSize }
  if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
  return <svg className={rulesetsToClassNames(className, { fill: 'currentColor' })} style={style} focusable='false' viewBox={viewBox} {...other as any}>
    {children ? children : <path d={data} />}
  </svg>
}

const textStyles = {
  root: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    '& .mui-text': { //high level Text is block element, inner Texts are inline elements
      display: 'inline',
    },
  },
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  } as React.CSSProperties
}

const TextWeb: React.SFC<PrimComps.Web & { numberOfLines?: number; notSelectable?: boolean; pressable?: boolean }> = props => {
  const { style, className, numberOfLines, notSelectable, pressable, $web, children } = props
  return <div
    className={'mui-text ' + rulesetsToClassNames(textStyles.root, className, notSelectable && textStyles.notSelectable, pressable && textStyles.pressable, numberOfLines === 1 && textStyles.singleLineStyle)}
    style={style} {...$web} children={children} />
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

const ScrollViewWeb: React.SFC<PrimComps.Web & { horizontal?: boolean; contentContainerStyle?: React.CSSProperties }> = props => {
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

export const Icon = IconWeb as React.SFC<PrimComps.IconX>
export const View = ViewWeb as React.SFC<PrimComps.ViewX>
export const Text = TextWeb as React.SFC<PrimComps.TextX>
export const ScrollView = ScrollViewWeb as React.SFC<PrimComps.ScrollViewX>
export const AnimatedView = View

