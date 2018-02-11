import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import { rulesetsToClassNames } from './fela'
import { sheetCreator } from '../common/index'
import { textSheet } from '../common/components'

export const view: Prim5s.CodeSFCWeb<Prim5s.ViewShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest} />
}

export const icon: Prim5s.CodeSFCWeb<Prim5s.IconShape> = props => {
  const { style, classes, className, data, mergeRulesetWithCascading, flip, theme, viewBox, children/*ignore children*/, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className)
  //replace fontSize with width x height
  if (rootStyle.fontSize) { rootStyle.height = rootStyle.width = rootStyle.fontSize; delete rootStyle.fontSize }
  if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
  return <svg className={rulesetsToClassNames(rootStyle)} style={style} focusable='false' viewBox={viewBox || '0 0 24 24'} {...rest}>
    <path d={data} />
  </svg>
}

export const text: Prim5s.CodeSFCWeb<Prim5s.TextShape> = props => {
  const { style, classes, className, numberOfLines, mergeRulesetWithCascading, flip, theme, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, props.onClick && classes.pressable, numberOfLines === 1 && classes.singleLineStyle, className)
  return <div className={Prim5s.CompNames.Text + ' ' + rulesetsToClassNames(rootStyle)} style={style} {...rest} />
}

export const scrollView: Prim5s.CodeSFCWeb<Prim5s.ScrollViewShape> = props => {
  const { style, classes, className, horizontal, mergeRulesetWithCascading, flip, theme, children, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, horizontal && classes.rootHorizontal, className)
  const containerStyle = mergeRulesetWithCascading(classes.container, horizontal && classes.containerHorizontal)
  //checkChildLayoutProps(style); checkChildLayoutProps(className)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest}>
    <div className={rulesetsToClassNames(containerStyle)}>
      {children}
    </div>
  </div>
}

//const checkChildLayoutProps = (css: React.CSSProperties) => {
//  if (/*process.env.NODE_ENV === 'production' ||*/ !css) return
//  const childLayoutProps = ['alignItems', 'justifyContent'].filter(prop => css && css[prop] !== undefined)
//  warning(childLayoutProps.length === 0, `ScrollView child layout (${JSON.stringify(childLayoutProps)}) must be applied through the contentContainerStyle prop.`)
//}
