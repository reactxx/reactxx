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

export const view: TComponents.SFCCode<TPrimitives.ViewShape> = propsCode => {
    const { styleX, classNameX, toClassNames, classes, ...rest } = propsCode
    return <div classNameX={toClassNames([classes.root, classNameX])} styleX={styleX} {...rest} />
}
view.modifyInnerState = (props, innerState) => innerState.$switch = { pressable: hasPlatformEvents(props) }

export const hasPlatformEvents = (propsCode: TComponents.PropsCode) => !!(
    window.isWeb ?
        propsCode.onClick || propsCode.onMouseUp || propsCode.onMouseDown :
        propsCode.onPress || propsCode.onPressIn || propsCode.onPressOut || propsCode.onLongPress
)

export const icon: TComponents.SFCCode<TPrimitives.IconShape> = propsCode => {
    const { styleX, classNameX, classes, toClassNames, children, data, url/*, onClick*/, ...rest } = propsCode
    const svg = <svg
        classNameX={toClassNames([classes.root, classNameX])}
        styleX={styleX}
        onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg
}
icon.modifyInnerState = (props, innerState) => innerState.$switch = { pressable: hasPlatformEvents(props) }

export const scrollView: TComponents.SFCCode<TPrimitives.ScrollViewShape> = propsode => {
    const { styleX, classNameX, classes, toClassNames, children, horizontal, ...rest } = propsode
    return <div classNameX={toClassNames([classes.root, classNameX])} styleX={styleX} {...rest}>
        <div classNameX={toClassNames([classes.container])}>
            {children}
        </div>
    </div>
}
scrollView.modifyInnerState = (props, innerState) => innerState.$switch = { horizontal: props.horizontal }

export const text: TComponents.SFCCode<TPrimitives.TextShape> = propsCode => {
    const { classNameX, classes, toClassNames, singleLine, url/*, onClick*/, ...rest } = propsCode
    const tagProps = {
        className: TPrimitives.Consts.textClassName,
        classNameX: toClassNames([classes.root, classNameX]),
        ...rest,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}
text.modifyInnerState = (props, innerState) => innerState.$switch = { pressable: hasPlatformEvents(props), singleLine: props.singleLine }

export const textCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
    displayName: CompNames.Text,
})
export const Text = textCreator()

export const viewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
    displayName: CompNames.View,
})
export const View = viewCreator()

export const iconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    displayName: CompNames.Icon,
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
export const Icon = iconCreator()

export const scrollViewCreator = withStylesCreator<TPrimitives.ScrollViewShape>(scrollViewSheet, scrollView, {
    displayName: CompNames.ScrollView,
    //codeHooks: {innerStateToSheetQuery: getScrollViewSheetQuery}
})
export const ScrollView = scrollViewCreator()

export const animatedTextCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
    displayName: CompNames.AnimatedText,
})
export const AnimatedText = animatedTextCreator()

export const animatedViewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
    displayName: CompNames.AnimatedView,
})
export const AnimatedView = animatedViewCreator()

export const animatedIconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    displayName: CompNames.AnimatedIcon,
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
export const AnimatedIcon = animatedIconCreator()

