/** @jsx createElement */

import React from 'react'
import ReactN from 'react-native'

//import { withStyles } from '../with-style/with-styles'
import { TPrimitives, TSheeter, TComponents } from '../d-index'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'

const withStyles = <T extends any>(...args: any[]) => null as any

// platform dependent import
import { createElement } from 'reactxx-core'

export const view: TComponents.SFCCode<TPrimitives.ViewShape> = props => {
    const { styleX, classNameX, classNames, classes, ...rest } = props
    const root = classNames(classes.root, hasPlatformEvents(props) && classes.pressable, classNameX) 
    return <div classNameX={root} styleX={styleX} {...rest} />
}

let hasPlatformEvents = props => false

export const icon: TComponents.SFCCode<TPrimitives.IconShape> = props => {
    const { styleX, classNameX, classes, classNames, children, data, url/*, onClick*/, ...rest } = props
    const rootStyle = classNames(classes.root, hasPlatformEvents(props) && classes.pressable, classNameX)
    const svg = <svg classNameX={rootStyle} styleX={styleX} onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg
}

export const scrollView: TComponents.SFCCode<TPrimitives.ScrollViewShape> = props => {
    const { styleX, classNameX, classes, classNames, children, horizontal, ...rest } = props
    const rootStyle = classNames(classes.root, horizontal && classes.rootHorizontal, classNameX)
    const containerStyle = classNames(classes.container, horizontal && classes.containerHorizontal)
    return <div classNameX={rootStyle} style={styleX} {...rest}>
        <div classNameX={containerStyle}>
            {children}
        </div>
    </div>
}

export const text: TComponents.SFCCode<TPrimitives.TextShape> = props => {
    const { classNameX, classes, classNames, numberOfLines, url/*, onClick*/, sheetQuery: { whenUsed }, ...rest } = props
    whenUsed.pressable = hasPlatformEvents(props)
    whenUsed.singleLine = numberOfLines === 1
    const tagProps = {
        className: TPrimitives.Consts.textClassName,
        classNameX: classNames(classes.root, classNameX),
        ...rest,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}

export const animatedView = view
export const animatedIcon = icon
export const animatedText = text
export const animatedScrollView = scrollView

export const View = withStyles<TPrimitives.ViewShape>(viewSheet, view)

export const Icon = withStyles<TPrimitives.IconShape>(iconSheet, icon, {
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
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


