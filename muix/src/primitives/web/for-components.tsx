//*** inspired by https://github.com/necolas/react-native-web

import React from 'react'
import warning from 'warning'
import { rulesetsToClassNames } from 'muix-styles/web'

const ViewWebStyle: React.CSSProperties = {
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  position: 'relative',
  zIndex: 0,
  minHeight: 0,
  minWidth: 0
}

export const ViewWeb: React.SFC<Primitives.Web> = props => {
  const { style, className, ...rest } = props
  return <div className={rulesetsToClassNames(ViewWebStyle, className)} style={style} {...rest} />
}

const TextWebStyle = {
  root: {
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline',
    font: 'inherit',
    fontFamily: 'System',
    fontSize: 14,
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    '& .mui-text': { //high level Text is block element, inner Texts are inline elements
      display: 'inline',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      whiteSpace: 'inherit',
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

export const TextWeb: React.SFC<Primitives.Web & { numberOfLines?: number; notSelectable?: boolean; pressable?: boolean }> = props => {
  const { style, className, numberOfLines, notSelectable, pressable, ...rest } = props
  return <div className={'mui-text ' + rulesetsToClassNames(TextWebStyle.root, className, notSelectable && TextWebStyle.notSelectable, pressable && TextWebStyle.pressable, numberOfLines === 1 && TextWebStyle.singleLineStyle)} style={style} {...rest} />
}

const ScrollViewWebStyle = {
  base: {
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    // Enable hardware compositing in modern browsers.
    // Creates a new layer with its own backing surface that can significantly
    // improve scroll performance.
    transform: [{ translateZ: 0 }]
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

export const ScrollViewWeb: React.SFC<Primitives.Web & { horizontal?: boolean; contentContainerStyle?: React.CSSProperties }> = props => {
  const { style, className, horizontal, children, contentContainerStyle, ...rest } = props
  checkChildLayoutProps(style); checkChildLayoutProps(className)
  return <div className={rulesetsToClassNames(ScrollViewWebStyle.base, horizontal && ScrollViewWebStyle.baseHorizontal, className)} style={style} {...rest}>
    <div className={rulesetsToClassNames(ViewWebStyle, contentContainerStyle, horizontal && ScrollViewWebStyle.contentContainerHorizontal)}>
      {children}
    </div>
  </div>
}

const checkChildLayoutProps = (css: React.CSSProperties) => {
  if (/*process.env.NODE_ENV === 'production' ||*/ !css) return
  const childLayoutProps = ['alignItems', 'justifyContent'].filter(prop => css && css[prop] !== undefined)
  warning(childLayoutProps.length === 0, `ScrollView child layout (${JSON.stringify(childLayoutProps)}) must be applied through the contentContainerStyle prop.`)
}

