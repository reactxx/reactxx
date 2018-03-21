import React from 'react'
import ReactN from 'react-native'
//import warning from 'warning'
//import { rulesetsToClassNames } from 'reactxx-fela'

import { withStyles } from '../common/withStyles'
//import * as sheets from '../common/components'

import * as Comps from 'reactxx-basic/comps'
import * as sheets from 'reactxx-basic/sheets'
//import { TComps } from 'reactxx-basic/typings'
import { TBasic, TComps } from 'reactxx-basic/typings'

//const view: TSheets.CodeSFCWeb<TComps.ViewShape> = props => {
//  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq,...rest } = props
//  const rootStyle = mergeRulesetWithOverrides(classes.root, className)
//  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest} />
//}

//const icon: TSheets.CodeSFCWeb<TComps.IconShape> = props => {
//  const { style, classes, className, data, mergeRulesetWithOverrides, theme, animations, viewBox, children/*this children*/, mediaq, url, onClick, ...rest } = props
//  const rootStyle = mergeRulesetWithOverrides(classes.root, onClick && classes.pressable, className)
//  //replace fontSize with width x height
//  if (rootStyle.fontSize) { rootStyle.height = rootStyle.width = rootStyle.fontSize; delete rootStyle.fontSize }
//  if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
//  const svg = <svg className={rulesetsToClassNames(rootStyle)} style={style} focusable='false' viewBox={viewBox || '0 0 24 24'} onClick={url ? undefined : onClick} {...rest}>
//    {data && <path d={data} />}
//    {!data && children}
//  </svg>
//  return url ? <a href={url}>{svg}</a> : svg
//}

//const text: TSheets.CodeSFCWeb<TComps.TextShape> = props => {
//  const { style, classes, className, numberOfLines, mergeRulesetWithOverrides, theme, animations, mediaq, url, onClick, ...rest } = props
//  const rootStyle = mergeRulesetWithOverrides(classes.root, onClick && classes.pressable, numberOfLines === 1 && classes.singleLineStyle, className) 
//  const tagProps = { className: TComps.CompNames.textClassName + ' ' + rulesetsToClassNames(rootStyle), style, ...rest, onClick: url ? undefined : onClick, ...rootStyle.$props }
//  return url ? <a href={url} {...tagProps} /> : <div {...tagProps}/>
//}

//const scrollView: TSheets.CodeSFCWeb<TComps.ScrollViewShape> = props => {
//  const { style, classes, className, horizontal, mergeRulesetWithOverrides, theme, animations, children, mediaq,...rest } = props
//  const rootStyle = mergeRulesetWithOverrides(classes.root, horizontal && classes.rootHorizontal, className)
//  const containerStyle = mergeRulesetWithOverrides(classes.container, horizontal && classes.containerHorizontal)
//  //checkChildLayoutProps(style); checkChildLayoutProps(className)
//  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest}>
//    <div className={rulesetsToClassNames(containerStyle)}>
//      {children}
//    </div>
//  </div>
//}

//const animatedView = view
//const animatedIcon = icon
//const animatedText = text
//const animatedScrollView = scrollView

//export const Text: TSheets.ComponentTypeX<TComps.TextShape> = withStyles(TComps.CompNames.Text, sheets.textSheet)(text)
//export const AnimatedText: TSheets.ComponentTypeX<TComps.TextShape> = withStyles(TComps.CompNames.AnimatedText, sheets.textSheet)(animatedText)
//export const View: TSheets.ComponentTypeX<TComps.ViewShape> = withStyles<TComps.ViewShape>(TComps.CompNames.View, sheets.viewSheet)(view)
//export const AnimatedView: TSheets.ComponentTypeX<TComps.ViewShape> = withStyles<TComps.ViewShape>(TComps.CompNames.AnimatedView, sheets.viewSheet)(animatedView)
//export const Icon: TSheets.ComponentTypeX<TComps.IconShape> = withStyles<TComps.IconShape>(TComps.CompNames.Icon, sheets.iconSheet)(icon)
//export const AnimatedIcon: TSheets.ComponentTypeX<TComps.IconShape> = withStyles<TComps.IconShape>(TComps.CompNames.AnimatedIcon, sheets.iconSheet)(animatedIcon)
//export const ScrollView: TSheets.ComponentTypeX<TComps.ScrollViewShape> = withStyles<TComps.ScrollViewShape>(TComps.CompNames.ScrollView, sheets.scrollViewSheet)(scrollView)
//export const AnimatedScrollView: TSheets.ComponentTypeX<TComps.ScrollViewShape> = withStyles<TComps.ScrollViewShape>(TComps.CompNames.AnimatedScrollView, sheets.scrollViewSheet)(animatedScrollView)

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, sheets.textSheet)(Comps.text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, sheets.textSheet)(Comps.animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, sheets.viewSheet)(Comps.view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, sheets.viewSheet)(Comps.animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, sheets.iconSheet)(Comps.icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, sheets.iconSheet)(Comps.animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, sheets.scrollViewSheet)(Comps.scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, sheets.scrollViewSheet)(Comps.animatedScrollView)
