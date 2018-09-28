/** @jsx createElement */

import React from 'react'
import ReactN from 'react-native'

import { createElement } from 'reactxx-sheeter'
import { TComponents } from 'reactxx-typings'
import { withStylesCreator } from 'reactxx-with-styles'

import { textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'
import { TPrimitives, CompNames } from './d-index'

// for "declaration": true
import { TProvider } from 'reactxx-with-styles'
import { TWithStyles, TSheeter } from 'reactxx-typings'

export const view: TComponents.SFCCode<TPrimitives.ViewShape> = props => {
    const { styleX, classNameX, toClassNames, classes, ...rest } = props
    props.sheetFlags = { pressable: hasPlatformEvents(props) }
    return <div classNameX={toClassNames([classes.root, classNameX])} styleX={styleX} {...rest} />
}

export const hasPlatformEvents = (cpx: TComponents.PropsCode) => !!(
    window.isWeb ?
        cpx.onClick || cpx.onMouseUp || cpx.onMouseDown :
        cpx.onPress || cpx.onPressIn || cpx.onPressOut || cpx.onLongPress
)

export const icon: TComponents.SFCCode<TPrimitives.IconShape> = props => {
    const { styleX, classNameX, classes, toClassNames, children, data, url/*, onClick*/, ...rest } = props
    props.sheetFlags = { pressable: hasPlatformEvents(props) }
    const svg = <svg
        classNameX={toClassNames([classes.root, classNameX])}
        styleX={styleX}
        onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg
}

export const scrollView: TComponents.SFCCode<TPrimitives.ScrollViewShape> = props => {
    const { styleX, classNameX, classes, toClassNames, children, horizontal, ...rest } = props
    props.sheetFlags = { horizontal }
    return <div classNameX={toClassNames([classes.root, classNameX])} styleX={styleX} {...rest}>
        <div classNameX={toClassNames([classes.container])}>
            {children}
        </div>
    </div>
}

export const text: TComponents.SFCCode<TPrimitives.TextShape> = props => {
    const { classNameX, classes, toClassNames, singleLine, url/*, onClick*/, ...rest } = props
    props.sheetFlags = {
        pressable: hasPlatformEvents(props),
        singleLine,
    }
    const tagProps = {
        className: TPrimitives.Consts.textClassName,
        classNameX: toClassNames([classes.root, classNameX]),
        ...rest,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}

export const textCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
    name: CompNames.Text,
})
export const Text = textCreator()

export const viewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
    name: CompNames.View,
})
export const View = viewCreator()

export const iconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    name: CompNames.Icon,
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
export const Icon = iconCreator()

export const scrollViewCreator = withStylesCreator<TPrimitives.ScrollViewShape>(scrollViewSheet, scrollView, {
    name: CompNames.ScrollView,
})
export const ScrollView = scrollViewCreator()

export const animatedTextCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
    name: CompNames.AnimatedText,
})
export const AnimatedText = animatedTextCreator()

export const animatedViewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
    name: CompNames.AnimatedView,
})
export const AnimatedView = animatedViewCreator()

export const animatedIconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    name: CompNames.AnimatedIcon,
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
export const AnimatedIcon = animatedIconCreator()

