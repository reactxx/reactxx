import { TComponents, TSheeter, TWithStyles } from 'reactxx-typings';
import {
    platform, resetPlatform,
    useWidthsLow, useForceUpdate, useUniqueId,
    toClassNamesWithQuery,
} from 'reactxx-sheeter'

import { useTheme } from './use-theme'
import { useDefaults } from './use-defaults'
import { useProps } from './use-props'

export const initUseReactxx = (force?: boolean) => {
    if (force) resetPlatform()
    if (platform._withStyles) return
    platform._withStyles = {
        $cache: {},
        defaultTheme: platform.getDefaultTheme && platform.getDefaultTheme(),
        uniqueIdCounter: 0,
        idCounter: 0,
    }
}

const useSheeter = <R extends TSheeter.Shape = TSheeter.Shape>(
    props: TComponents.Props<R>,
    config: TWithStyles.ComponentConfig<R>,
    displayName?: string
) => {

    const { _withStyles } = platform

    if (!config.id) config.id = ++_withStyles.idCounter
    config.displayName = displayName

    // theme
    const [theme] = useTheme<TSheeter.getTheme<R>>()

    // from defaults
    const { sheet, propsDefault, themedPropsDefault } = useDefaults(theme, config)

    // from props
    const { classes, classNameX, styleX, propsRest, themedProps } = useProps<R>(theme, config, sheet, props)

    // widths
    const forceUpdate = useForceUpdate()
    const uniqueId = useUniqueId(platform._withStyles)
    const { actWidth, getWidthMap, breakpoints } = useWidthsLow(uniqueId, forceUpdate)

    // merge propsDefault with props and themeProps
    const propsCode = mergeCodeProps<R>([
        propsDefault, themedPropsDefault && themedPropsDefault(theme),
        propsRest, themedProps && themedProps(theme),
        { $widths: { actWidth, breakpoints } } as TComponents.PropsCode
    ])

    const toClassNames = (...rulesets: TSheeter.RulesetOrAtomized[]) => toClassNamesWithQuery(propsCode, ...rulesets)

    return { getWidthMap, toClassNames, propsCode, classes, styleX, classNameX, theme, uniqueId, forceUpdate }
}

interface Shape extends TSheeter.ShapeAncestor { }

const myComponentConfig: TWithStyles.ComponentConfig<Shape> = null

const useMyComponent = () => {
    
}

const MyComponent: TComponents.SFC<Shape> = props => {
    const {
        getWidthMap, toClassNames, propsCode, classes,
        styleX, classNameX, theme, uniqueId, forceUpdate
    } = useSheeter<Shape>(props, myComponentConfig, MyComponent.displayName)
    return null
}
MyComponent.displayName = 'xxxx'

const mergeCodeProps = <R extends TSheeter.Shape>(...props: (TComponents.PropsCode & TComponents.Props)[]) => {
    if (!props || props.length === 0) return undefined
    let res: TComponents.PropsCode<R> = {}
    props.forEach(p => {
        if (!p) return
        Object.assign(res, p)
        const { $web, $native } = p
        const platform = window.isWeb ? $web : $native
        if (platform) Object.assign(res, platform)
    })
    return res
}