/** @jsx createElement */

import React from 'react'
import ReactN from 'react-native'

import { createElement, withStylesCreator } from 'reactxx-core'
import { TComponents } from 'reactxx-typings'
// for "declaration": true
import { TProvider } from 'reactxx-core'
import { TWithStyles, TSheeter } from 'reactxx-typings'

import { textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'
import { TPrimitives } from './d-index'

export const view: TComponents.SFCCode<TPrimitives.ViewShape> = props => {
    const { styleX, classNameX, toClassNames, classes, sheetQuery, ...rest } = props
    sheetQuery.$whenFlag = { pressable: hasPlatformEvents(props) }
    return <div classNameX={toClassNames(classes.root, classNameX)} styleX={styleX} {...rest} />
}

export const hasPlatformEvents = (cpx: TComponents.PropsCode) => !!(
    window.isWeb ?
        cpx.onClick || cpx.onMouseUp || cpx.onMouseDown :
        cpx.onPress || cpx.onPressIn || cpx.onPressOut || cpx.onLongPress
)

export const icon: TComponents.SFCCode<TPrimitives.IconShape> = props => {
    const { styleX, classNameX, classes, toClassNames, children, data, url/*, onClick*/, sheetQuery, ...rest } = props
    sheetQuery.$whenFlag = { pressable: hasPlatformEvents(props) }
    const svg = <svg
        classNameX={toClassNames(classes.root, classNameX)}
        styleX={styleX}
        onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg
}

export const scrollView: TComponents.SFCCode<TPrimitives.ScrollViewShape> = props => {
    const { styleX, classNameX, classes, toClassNames, children, horizontal, sheetQuery, ...rest } = props
    sheetQuery.$whenFlag = { horizontal }
    return <div classNameX={toClassNames(classes.root, classNameX)} styleX={styleX} {...rest}>
        <div classNameX={toClassNames(classes.container)}>
            {children}
        </div>
    </div>
}

export const text: TComponents.SFCCode<TPrimitives.TextShape> = props => {
    const { classNameX, classes, toClassNames, singleLine, url/*, onClick*/, sheetQuery, ...rest } = props
    sheetQuery.$whenFlag = {
        pressable: hasPlatformEvents(props),
        singleLine,
    }
    const tagProps = {
        className: TPrimitives.Consts.textClassName,
        classNameX: toClassNames(classes.root, classNameX),
        ...rest,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}

export const textCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text)
export const Text = textCreator()

export const viewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view)
export const View = viewCreator()

export const iconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
export const Icon = iconCreator()

export const scrollViewCreator = withStylesCreator<TPrimitives.ScrollViewShape>(scrollViewSheet, scrollView)
export const ScrollView = scrollViewCreator()

export const animatedTextCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text)
export const AnimatedText = animatedTextCreator()

export const animatedViewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view)
export const AnimatedView = animatedViewCreator()

export const animatedIconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
export const AnimatedIcon = animatedIconCreator()

export const animatedScrollViewCreator = withStylesCreator<TPrimitives.ScrollViewShape>(scrollViewSheet, scrollView)
export const AnimatedScrollView = animatedScrollViewCreator()
