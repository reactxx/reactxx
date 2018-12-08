import React from 'react'
import { platform, toClassNamesWithQuery, useForceUpdate, useUniqueId, useWidthsLow } from 'reactxx-sheeter';
import { TTyped } from 'reactxx-typings';
import { TComponents } from '../typings/components'
import { TUseSheeter } from '../typings/use-sheeter'
import warning from 'warning';
import { useConfig } from './use-config';
import { useDefaults } from './use-defaults';
import { useProps } from './use-props';
import { useTheme } from './use-theme';

const useSheeter = <R extends TTyped.Shape = TTyped.Shape>(
    props: TComponents.Props<R>,
    authorConfig: TUseSheeter.AuthorConfig<R>,
    displayName: string,
    userConfig?: TUseSheeter.UserConfig<R>
) => {

    const config = useConfig(authorConfig, userConfig)

    // theme
    const [theme] = useTheme<TTyped.getTheme<R>>()

    // from defaults
    const { sheet, propsDefault, themedPropsDefault, propsOverride, themedPropsOverride
    } = useDefaults(theme, config, displayName)

    // from props
    const { classes, css, styles, propsRest, themedProps
    } = useProps<R>(theme, sheet, props)

    // widths
    const uniqueIdRef = React.useRef(0) // unique ID
    if (!uniqueIdRef.current) uniqueIdRef.current = ++platform._withStyles.uniqueIdCounter
    const forceUpdate = useForceUpdate()
    const uniqueId = useUniqueId(platform._withStyles)
    const { actWidth, getWidthMap, breakpoints } = useWidthsLow(uniqueId, forceUpdate)

    // merge props with default's
    const propsCode: TTyped.PropsCode<R> = {
        $widths: { actWidth, breakpoints },
    }
    mergeCodeProps(propsCode, [
        propsDefault, themedPropsDefault && themedPropsDefault(theme),
        propsOverride, themedPropsOverride && themedPropsOverride(theme),
        propsRest, themedProps && themedProps(theme),
    ])

    const toClassNames = <T extends TTyped.RulesetIds>(...rulesets: TTyped.Ruleset<T>[]) =>
        toClassNamesWithQuery(propsCode, ...rulesets) as any as T

    return { getWidthMap, toClassNames, propsCode, classes, styles, css, uniqueId, forceUpdate }
}

const mergeCodeProps = (propsCode: TTyped.PropsCode, props: TComponents.Props[]) => {
    if (!props || props.length === 0) return
    let rootWebProps, rootNativeProps, rootProps
    for (const p of props) {
        if (!p) continue
        Object.assign(propsCode, p)
        // merge child component root props
        const { $rootWebProps, $rootNativeProps, $rootProps } = p
        $rootWebProps && Object.assign(rootWebProps || (rootWebProps = {}), $rootWebProps)
        $rootNativeProps && Object.assign(rootNativeProps || (rootNativeProps = {}), $rootNativeProps)
        $rootProps && Object.assign(rootProps || (rootProps = {}), $rootProps)
    }
    if (rootWebProps) propsCode.$rootWebProps = rootWebProps
    if (rootNativeProps) propsCode.$rootNativeProps = rootNativeProps
    if (rootProps) propsCode.$rootProps = rootProps
}

export default useSheeter