/** @jsx createElement */

import React from 'react'
import ReactN from 'react-native'

import { classNames } from '../extend-reacts/class-names'
import { withStyles } from './with-styles'
import { TPrimitives, TSheeter } from '../typings/index'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'

// platform dependent import
import { createElement } from 'reactxx-core'

export const view: TSheeter.SFCCode<TPrimitives.ViewShape> = props => {
    const { styleX, classNameX, classes, ...rest } = props
    const root = classNames(classes.root, hasPlatformEvents(props) && classes.pressable, classNameX)
    return <div classNameX={root} styleX={styleX} {...rest} />
}

let hasPlatformEvents = props => false

export const icon: TSheeter.SFCCode<TPrimitives.IconShape> = props => {
    const { styleX, classNameX, classes, children, data, $web: { viewBox }, url/*, onClick*/, ...rest } = props
    const rootStyle = classNames(classes.root, hasPlatformEvents(props) && classes.pressable, classNameX)
    const svg = <svg classNameX={rootStyle} styleX={styleX} onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg
}

export const scrollView: TSheeter.SFCCode<TPrimitives.ScrollViewShape> = props => {
    const { styleX, classNameX, classes, children, horizontal, ...rest } = props
    const rootStyle = classNames(classes.root, horizontal && classes.rootHorizontal, classNameX)
    const containerStyle = classNames(classes.container, horizontal && classes.containerHorizontal)
    return <div classNameX={rootStyle} style={styleX} {...rest}>
        <div classNameX={containerStyle}>
            {children}
        </div>
    </div>
}

export const text: TSheeter.SFCCode<TPrimitives.TextShape> = props => {
    const { styleX, classNameX, classes, children, numberOfLines, url/*, onClick*/, ...rest } = props
    const rootStyle = classNames(classes.root, hasPlatformEvents(props) && classes.pressable, classNameX)
    const tagProps = { 
        className: TPrimitives.Consts.textClassName, 
        classNameX: rootStyle, 
        styleX, 
        ...rest, 
        onClick: url ? undefined : undefined /*onClick*/ } 
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}

export const animatedView = view
export const animatedIcon = icon
export const animatedText = text
export const animatedScrollView = scrollView

export const View = withStyles<TPrimitives.ViewShape>(viewSheet, view)

export const Icon = withStyles<TPrimitives.IconShape>(iconSheet, icon, {
    $web: {
        viewBox: '0 0 24 24',
        focusable: 'false'
    }
})



// export const Text = (): Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, text as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.Text})()
// export const AnimatedText: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, animatedText as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.AnimatedText})()
// export const View: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, view as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.View})()
// export const AnimatedView: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, animatedView as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.AnimatedView})()
// export const Icon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, icon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.Icon})()
// export const AnimatedIcon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, animatedIcon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.AnimatedIcon})()
// export const ScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, scrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.ScrollView})()
// export const AnimatedScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, animatedScrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.AnimatedScrollView})()


