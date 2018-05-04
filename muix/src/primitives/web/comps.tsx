import React from 'react'
import warning from 'warning'

import { rulesetsToClassNames } from 'reactxx-fela'
import { Types, mergeRulesets } from 'reactxx-basic'

import { TComps, CompNames } from '../typings/comps'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from '../common/comps-sheets'

export const view: Types.CodeSFCWeb<TComps.ViewShape> = props => {
  const { system: { style, classes }, ...rest } = props
  const rootStyle = mergeRulesets<'Web'>(classes.root)
  return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest} />
}

export const icon: Types.CodeSFCWeb<TComps.IconShape> = props => {
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

export const text: Types.CodeSFCWeb<TComps.TextShape> = props => {
  const { system: { style, classes }, numberOfLines, url, onClick, ...rest } = props
  const rootStyle = mergeRulesets<'Web'>(classes.root, onClick && classes.pressable, numberOfLines === 1 && classes.singleLineStyle)
  const tagProps = { className: TComps.Consts.textClassName + ' ' + rulesetsToClassNames(rootStyle), style, ...rest, onClick: url ? undefined : onClick } //, ...rootStyle.$props }
  return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}

export const scrollView: Types.CodeSFCWeb<TComps.ScrollViewShape> = props => {
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

export const animatedView = view
export const animatedIcon = icon
export const animatedText = text
export const animatedScrollView = scrollView

