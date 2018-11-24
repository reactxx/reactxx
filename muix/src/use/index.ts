import { TComponents, TSheeter, TWithStyles } from 'reactxx-typings';
import warning from 'warning'
import {
    platform, resetPlatform,
    useWidthsLow, useForceUpdate, useUniqueId,
    toClassNamesWithQuery,
} from 'reactxx-sheeter'

import { useTheme } from './use-theme'
import { useDefaults } from './use-defaults'
import { useProps } from './use-props'
import { useConfig } from './use-config'

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

export const useSheeter = <R extends TSheeter.Shape = TSheeter.Shape>(
    props: TComponents.Props<R>,
    configDefault: TWithStyles.ComponentConfig<R>,
    displayName?: string,
    configOverride?: TWithStyles.ComponentConfigOverride<R>
) => {

    const config = useConfig(configDefault, displayName, configOverride)

    warning(config === configDefault || config === configOverride, '!(config===configDefault || configDefault===configOverride)')

    // theme
    const [theme] = useTheme<TSheeter.getTheme<R>>()

    // from defaults
    const { sheet, propsDefault, themedPropsDefault, propsOverride, themedPropsOverride
    } = useDefaults(theme, config)

    // from props
    const { classes, classNameX, styleX, propsRest, themedProps
    } = useProps<R>(theme, config, sheet, props)

    // widths
    const forceUpdate = useForceUpdate()
    const uniqueId = useUniqueId(platform._withStyles)
    const { actWidth, getWidthMap, breakpoints } = useWidthsLow(uniqueId, forceUpdate)

    // merge props with default's
    const propsCode: TComponents.PropsCode = { $widths: { actWidth, breakpoints } }
    mergeCodeProps(propsCode, [
        propsDefault, themedPropsDefault && themedPropsDefault(theme),
        propsOverride, themedPropsOverride && themedPropsOverride(theme),
        propsRest, themedProps && themedProps(theme),
    ])

    const toClassNames = (...rulesets: TSheeter.RulesetOrAtomized[]) => toClassNamesWithQuery(propsCode, ...rulesets)

    return { getWidthMap, toClassNames, propsCode, classes, styleX, classNameX, theme, uniqueId, forceUpdate }
}

interface Shape extends TSheeter.ShapeAncestor { }

const myComponentConfig: TWithStyles.ComponentConfig<Shape> = null

const useMyComponent = (configOverride: TWithStyles.ComponentConfigOverride<Shape>, displayName: string) => props =>
    useSheeter<Shape>(props, myComponentConfig, displayName, configOverride)


const configOverride1: TWithStyles.ComponentConfigOverride<Shape> = {}
const MyComponent1: TComponents.SFC<Shape> = props => {
    const {
        getWidthMap, toClassNames, propsCode, classes,
        styleX, classNameX, theme, uniqueId, forceUpdate
    } = useMyComponent(configOverride1, MyComponent1.displayName)(props)
    return null
}
MyComponent1.displayName = 'comp1'

const configOverride2: TWithStyles.ComponentConfigOverride<Shape> = {}
const MyComponent2: TComponents.SFC<Shape> = props => {
    const {
        getWidthMap, toClassNames, propsCode, classes,
        styleX, classNameX, theme, uniqueId, forceUpdate
    } = useMyComponent(configOverride2, MyComponent2.displayName)(props)
    return null
}
MyComponent2.displayName = 'comp2'


const mergeCodeProps = (target, props: TComponents.Props[]) => {
    if (!props || props.length === 0) return
    props.forEach(p => {
        if (!p) return
        Object.assign(target, p)
        const { $web, $native } = p
        const platform = window.isWeb ? $web : $native
        if (platform) Object.assign(target, platform)
    })
    delete target.$web; delete target.$native; delete target.themedProps
}