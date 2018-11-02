/** @jsx platform.createElement */

import { assignPlatform, platform } from 'reactxx-sheeter'
import { TComponents } from 'reactxx-typings'
import { withStylesCreator } from 'reactxx-with-styles'

import { hasPlatformEvents, textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'
import { TPrimitives, CompNames } from './d-index'

// for "declaration": true
//import {  } from 'reactxx-with-styles'
import { TWithStyles, TSheeter } from 'reactxx-typings'

const view: TComponents.SFCCode<TPrimitives.ViewShape> = propsCode => {
    const { styleX, classNameX, toClassNames, classes, ...rest } = propsCode
    return <div classNameX={toClassNames([classes.root, classNameX])} styleX={styleX} {...rest} />
}
view.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: hasPlatformEvents(props) }

const icon: TComponents.SFCCode<TPrimitives.IconShape> = propsCode => {
    const { styleX, classNameX, classes, toClassNames, children, data, url/*, onClick*/, ...rest } = propsCode
    const svg = <svg
        classNameX={toClassNames([classes.root, classNameX])}
        styleX={styleX}
        onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg
}
icon.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: hasPlatformEvents(props) }

const scrollView: TComponents.SFCCode<TPrimitives.ScrollViewShape> = propsode => {
    const { styleX, classNameX, classes, toClassNames, children, horizontal, ...rest } = propsode
    return <div classNameX={toClassNames([classes.root, classNameX])} styleX={styleX} {...rest}>
        <div classNameX={toClassNames([classes.container])}>
            {children}
        </div>
    </div>
}
scrollView.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { horizontal: props.horizontal }

const text: TComponents.SFCCode<TPrimitives.TextShape> = propsCode => {
    const { classNameX, styleX, classes, toClassNames, singleLine, url/*, onClick*/, ...rest } = propsCode
    const tagProps = {
        className: TPrimitives.Consts.textClassName,
        classNameX: toClassNames([classes.root, classNameX]),
        styleX,
        ...rest,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}
text.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: hasPlatformEvents(props), singleLine: props.singleLine }

const textCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
    displayName: CompNames.Text,
})
const Text = textCreator()

const viewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
    displayName: CompNames.View,
})
const View = viewCreator()

const iconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    displayName: CompNames.Icon,
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
const Icon = iconCreator()

const scrollViewCreator = withStylesCreator<TPrimitives.ScrollViewShape>(scrollViewSheet, scrollView, {
    displayName: CompNames.ScrollView,
})
const ScrollView = scrollViewCreator()

const animatedTextCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
    displayName: CompNames.AnimatedText,
})
const AnimatedText = animatedTextCreator()

const animatedViewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
    displayName: CompNames.AnimatedView,
})
const AnimatedView = animatedViewCreator()

const animatedIconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
    displayName: CompNames.AnimatedIcon,
    defaultProps: {
        $web: {
            viewBox: '0 0 24 24',
            focusable: 'false'
        }
    }
})
const AnimatedIcon = animatedIconCreator()

export {
    view,
    text,
    icon,
    scrollView,
    viewCreator,
    textCreator,
    iconCreator,
    View,
    Text,
    Icon,
    ScrollView,
    scrollViewCreator,
    animatedViewCreator,
    animatedTextCreator,
    animatedIconCreator,
    AnimatedView,
    AnimatedText,
    AnimatedIcon,
}

 export const init = () => assignPlatform({
    view,
    text,
    icon,
    scrollView,
    viewCreator,
    textCreator,
    iconCreator,
    View,
    Text,
    Icon,
    ScrollView,
    scrollViewCreator,
    animatedViewCreator,
    animatedTextCreator,
    animatedIconCreator,
    AnimatedView,
    AnimatedText,
    AnimatedIcon,
 })
