import React from 'react'
import warning from 'warning'

import { rulesetsToClassNames } from 'reactxx-fela'
import { Types } from 'reactxx-basic'

//import { withStyles } from '../common/withStyles'
import { withStyles, mergeRulesets } from '../common/withStyles'
import { TBasic } from '../typings/basic'
import { TComps, CompNames } from '../typings/comps'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from '../common/comps-sheets'

const view: Types.CodeSFCWeb<TComps.ViewShape> = props => {
  const { system: { style, classes }, ...rest } = props
  const rootStyle = mergeRulesets<'Web'>(classes.root)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest} />
}

const icon: Types.CodeSFCWeb<TComps.IconShape> = props => {
  const { system: { style, classes }, children, data, viewBox, url, onClick, ...rest } = props
  const rootStyle = mergeRulesets<'Web'>(classes.root, onClick && classes.pressable)
  //replace fontSize with width x height
  if (rootStyle.fontSize) { rootStyle.height = rootStyle.width = rootStyle.fontSize; delete rootStyle.fontSize }
  if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
  const svg = <svg className={rulesetsToClassNames(rootStyle)} style={style} focusable='false' viewBox={viewBox || '0 0 24 24'} onClick={url ? undefined : onClick} {...rest}>
    {data && <path d={data} />}
    {!data && children}
  </svg>
  return url ? <a href={url}>{svg}</a> : svg
}

const text: Types.CodeSFCWeb<TComps.TextShape> = props => {
  const { system: { style, classes }, numberOfLines, url, onClick, ...rest } = props
  const rootStyle = mergeRulesets<'Web'>(classes.root, onClick && classes.pressable, numberOfLines === 1 && classes.singleLineStyle)
  const tagProps = { className: TComps.Consts.textClassName + ' ' + rulesetsToClassNames(rootStyle), style, ...rest, onClick: url ? undefined : onClick } //, ...rootStyle.$props }
  return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}

const scrollView: Types.CodeSFCWeb<TComps.ScrollViewShape> = props => {
  const { system: { style, classes }, children, horizontal, ...rest } = props
  const rootStyle = mergeRulesets<'Web'>(classes.root, horizontal && classes.rootHorizontal)
  const containerStyle = mergeRulesets<'Web'>(classes.container, horizontal && classes.containerHorizontal)
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

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, textSheet)(text as TBasic.CodeComponentType<TComps.TextShape>)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, textSheet)(animatedText as TBasic.CodeComponentType<TComps.TextShape>)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, viewSheet)(view as TBasic.CodeComponentType<TComps.ViewShape>)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, viewSheet)(animatedView as TBasic.CodeComponentType<TComps.ViewShape>)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, iconSheet)(icon as TBasic.CodeComponentType<TComps.IconShape>)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, iconSheet)(animatedIcon as TBasic.CodeComponentType<TComps.IconShape>)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, scrollViewSheet)(scrollView as TBasic.CodeComponentType<TComps.ScrollViewShape>)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, scrollViewSheet)(animatedScrollView as TBasic.CodeComponentType<TComps.ScrollViewShape>)
