import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import { rulesetsToClassNames } from './fela'

export const view: ReactXX.CodeSFCWeb<ReactXX.ViewShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest} />
}

export const icon: ReactXX.CodeSFCWeb<ReactXX.IconShape> = props => {
  const { style, classes, className, data, mergeRulesetWithOverrides, theme, animations, viewBox, children/*this children*/, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className)
  //replace fontSize with width x height
  if (rootStyle.fontSize) { rootStyle.height = rootStyle.width = rootStyle.fontSize; delete rootStyle.fontSize }
  if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
  return <svg className={rulesetsToClassNames(rootStyle)} style={style} focusable='false' viewBox={viewBox || '0 0 24 24'} {...rest}>
    <path d={data || children as string} />
  </svg>
}

export const text: ReactXX.CodeSFCWeb<ReactXX.TextShape> = props => {
  const { style, classes, className, numberOfLines, mergeRulesetWithOverrides, theme, animations, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, props.onClick && classes.pressable, numberOfLines === 1 && classes.singleLineStyle, className) 
  return <div className={ReactXX.CompNames.textClassName + ' ' + rulesetsToClassNames(rootStyle)} style={style} {...rest} {...rootStyle.$props}/>
}

export const scrollView: ReactXX.CodeSFCWeb<ReactXX.ScrollViewShape> = props => {
  const { style, classes, className, horizontal, mergeRulesetWithOverrides, theme, animations, children, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, horizontal && classes.rootHorizontal, className)
  const containerStyle = mergeRulesetWithOverrides(classes.container, horizontal && classes.containerHorizontal)
  //checkChildLayoutProps(style); checkChildLayoutProps(className)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest}>
    <div className={rulesetsToClassNames(containerStyle)}>
      {children}
    </div>
  </div>
}

export const animatedView = view
export const animatedIcon = icon
export const animatedText = text
export const animatedScrollView = scrollView

//const checkChildLayoutProps = (css: React.CSSProperties) => {
//  if (/*process.env.NODE_ENV === 'production' ||*/ !css) return
//  const childLayoutProps = ['alignItems', 'justifyContent'].filter(prop => css && css[prop] !== undefined)
//  warning(childLayoutProps.length === 0, `ScrollView child layout (${JSON.stringify(childLayoutProps)}) must be applied through the contentContainerStyle prop.`)
//}
