/** @jsx createElement */

import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { classNames } from '../extend-reacts/class-names'
import { mergeSheets } from '../extend-reacts/merge-sheets'

// platform dependent import
import { createElement } from 'reactxx-core'

import { TPrimitives, TSheeter } from '../typings/index'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'

export const view: TSheeter.WithStyles<TPrimitives.ViewShape> = sheet => (props: TSheeter.PropsCode<TPrimitives.ViewShape>) => {
    const { styleX, classNameX, classes, ...rest } = props
    const msheet = mergeSheets(sheet, classes)
    const root = classNames(msheet.root, hasPlatformEvents(props) && msheet.pressable, classNameX)
    return <div classNameX={root} styleX={styleX} {...rest}/>
}

export const View = view(viewSheet)

let hasPlatformEvents = props => false

// export const icon: TSheeter.CodeSFCWeb<TPrimitives.IconShape> = props => {
//   const { $system: { classNames }, style, classes, className, children, data, viewBox, url, onClick, ...rest } = props
//   const rootStyle = classNames<'Web'>(classes.root, hasPlatformEvents(props) && classes.pressable, className)
//   //replace fontSize with width x height
//   if (rootStyle.fontSize) { rootStyle.height = rootStyle.width = rootStyle.fontSize; delete rootStyle.fontSize }
//   if (style && style.fontSize) { style.height = style.width = style.fontSize; delete style.fontSize }
//   const svg = <svg className={rulesetsToClassNames(rootStyle)} style={style} focusable='false' viewBox={viewBox || '0 0 24 24'} onClick={url ? undefined : onClick} {...rest}>
//     {data ? <path d={data} /> : children}
//   </svg>
//   return url ? <a href={url}>{svg}</a> : svg
// }

// export const text: TSheeter.CodeSFCWeb<TPrimitives.TextShape> = props => {
//   const { $system: { classNames, $developer_RenderCounter }, style, classes, className, numberOfLines, url, onClick, ...rest } = props
//   const rootStyle = classNames<'Web'>(classes.root, hasPlatformEvents(props) && classes.pressable, numberOfLines === 1 && classes.singleLineStyle, className)
//   const tagProps = { className: TPrimitives.Consts.textClassName + ' ' + rulesetsToClassNames(rootStyle), style, ...rest, onClick: url ? undefined : onClick } 

//   if ($developer_RenderCounter) {
//     const txt = '[' + $developer_RenderCounter + '] '
//     tagProps.children = React.Children.count(props.children) == 0 ? txt : [txt, ...React.Children.toArray(props.children)]
//   }

//   return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
// }

// export const scrollView: TSheeter.CodeSFCWeb<TPrimitives.ScrollViewShape> = props => {
//   const { $system: { classNames }, style, classes, className, children, horizontal, ...rest } = props
//   const rootStyle = classNames<'Web'>(classes.root, horizontal && classes.rootHorizontal, className)
//   const containerStyle = classNames<'Web'>(classes.container, horizontal && classes.containerHorizontal)
//   //checkChildLayoutProps(style); checkChildLayoutProps(className)
//   return <div className={rulesetsToClassNames(rootStyle)} style={style} {...rest}>
//     <div className={rulesetsToClassNames(containerStyle)}>
//       {children}
//     </div>
//   </div>
// }


// export const animatedView = view
// export const animatedIcon = icon
// export const animatedText = text
// export const animatedScrollView = scrollView

// export const Text = (): Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, text as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.Text})()
// export const AnimatedText: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, animatedText as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.AnimatedText})()
// export const View: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, view as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.View})()
// export const AnimatedView: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, animatedView as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.AnimatedView})()
// export const Icon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, icon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.Icon})()
// export const AnimatedIcon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, animatedIcon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.AnimatedIcon})()
// export const ScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, scrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.ScrollView})()
// export const AnimatedScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, animatedScrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.AnimatedScrollView})()


