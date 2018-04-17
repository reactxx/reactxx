import React from 'react'
import warning from 'warning'

import { rulesetsToClassNames } from 'reactxx-fela'

import { withStyles } from '../common/withStyles'
import { TBasic } from '../typings/basic'
import { TComps } from '../typings/comps'
import { CompNames } from '../typings/index'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from '../common/comps-sheets'

const view: TBasic.CodeSFCWeb<TComps.ViewShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest} />
}

const icon: TBasic.CodeSFCWeb<TComps.IconShape> = props => {
  const { style, classes, className, data, mergeRulesetWithOverrides, theme, animations, viewBox, children/*this children*/, mediaq, url, onClick, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, onClick && classes.pressable, className)
  //replace fontSize with width x height
  if (rootStyle.fontSize) { rootStyle.height = rootStyle.width = rootStyle.fontSize; delete rootStyle.fontSize }
  if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
  const svg = <svg className={rulesetsToClassNames(rootStyle)} style={style} focusable='false' viewBox={viewBox || '0 0 24 24'} onClick={url ? undefined : onClick} {...rest}>
    {data && <path d={data} />}
    {!data && children}
  </svg>
  return url ? <a href={url}>{svg}</a> : svg
}

const text: TBasic.CodeSFCWeb<TComps.TextShape> = props => {
  const { style, classes, className, numberOfLines, mergeRulesetWithOverrides, theme, animations, mediaq, url, onClick, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, onClick && classes.pressable, numberOfLines === 1 && classes.singleLineStyle, className)
  const tagProps = { className: TBasic.Consts.textClassName + ' ' + rulesetsToClassNames(rootStyle), style, ...rest, onClick: url ? undefined : onClick, ...rootStyle.$props }
  return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}

const scrollView: TBasic.CodeSFCWeb<TComps.ScrollViewShape> = props => {
  const { style, classes, className, horizontal, mergeRulesetWithOverrides, theme, animations, children, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, horizontal && classes.rootHorizontal, className)
  const containerStyle = mergeRulesetWithOverrides(classes.container, horizontal && classes.containerHorizontal)
  //checkChildLayoutProps(style); checkChildLayoutProps(className)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest}>
    <div className={rulesetsToClassNames(containerStyle)}>
      {children}
    </div>
  </div>
}

const animatedView = view
const animatedIcon = icon
const animatedText = text
const animatedScrollView = scrollView

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, textSheet)(text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, textSheet)(animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, viewSheet)(view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, viewSheet)(animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, iconSheet)(icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, iconSheet)(animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, scrollViewSheet)(scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, scrollViewSheet)(animatedScrollView)
