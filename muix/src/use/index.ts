import React from 'react';
import { TAtomize, TComponents, TSheeter, TWithStyles, TVariants, TCommonStyles } from 'reactxx-typings';
import { useTheme } from './theme'
import { useWidthsLow, $WidthsQuery, atomizeSheet, atomizeRuleset, atomizeStyle, mergeSheets } from 'reactxx-sheeter'

const use = <R extends TSheeter.Shape = TSheeter.Shape>(props: TComponents.Props<R>, options: TWithStyles.ComponentOptions<R>) => {
    const uniqueId = React.useRef(++counter) // unique ID
    const [, forceUpdate] = React.useState<null>(null) // forceUpdate

    // theme
    const [theme] = useTheme()
    // from config
    const { sheet, propsDefault, themedPropsDefault } = React.useMemo(() => withStyles(theme, options), [theme, options])
    // from props
    const { classes: _classes, classNameX: _classNameX, styleX: _styleX, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(_classes, theme, 'classes')
        return mergeSheets([sheet, classes])
    }, [options, theme, _classes])

    // classNameX
    const classNameX = React.useMemo(() => atomizeRuleset(_classNameX, theme, 'classes'), [_classNameX, theme])

    // styleX
    const styleX = React.useMemo(() => atomizeStyle(_styleX, theme, 'styleX'), [_styleX])

    // widths
    const { actWidth, getWidthMap, breakpoints } = useWidthsLow(uniqueId.current, forceUpdate)

    const widthsQuery: $WidthsQuery = {
        $widths: { actWidth, breakpoints }
    }
    
    // merge propsDefault with props and themeProps
    const propsCode = mergeCodeProps([
        propsDefault, themedPropsDefault && themedPropsDefault(theme), propsRest,
        themedProps && themedProps(theme),
        widthsQuery])

    return { propsCode, getWidthMap, theme, classes, styleX, classNameX }
}

let counter = 0

let withStyles

interface Shape extends TSheeter.ShapeAncestor { }

const MyComponent: TComponents.SFC<Shape> = props => {
    const { } = use<Shape>(props, null)
    return null
}

const mergeCodeProps = (...props) => {
    if (!props || props.length === 0) return undefined
    let res = {}
    props.forEach(p => {
        if (!p) return
        Object.assign(res, p)
        const { $web, $native } = p
        const platform = window.isWeb ? $web : $native
        if (platform) Object.assign(res, platform)
    })
    return res
}