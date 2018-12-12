import React from 'react'
import { platform, useWidths } from 'reactxx-styles';
import { TTyped, TComponents, O } from 'reactxx-typings';
import { useDefaults } from './use-defaults';
import { useProps } from './use-props';
import { useTheme } from './use-theme';

export const useStylesUntyped = (props, config?) => useStyles(props, config) as any

const useStyles = <R extends TTyped.Shape = TTyped.Shape>(
    props: TComponents.Props<R>,
    config: TComponents.Config
) => {

    // theme
    const [theme] = useTheme<TTyped.getTheme<R>>()

    // from defaults
    const { sheet, propsDefault, themedPropsDefault, propsOverride, themedPropsOverride } = useDefaults(theme, config)

    // from props
    const { classes, className, style, propsRest, themedProps } = useProps<R>(theme, sheet, props)

    // widths
    const { actWidth, getWidthMap, breakpoints } = useWidths()

    // merge props with default's
    const propsCode: TTyped.PropsCode<R> = {
        $widths: { actWidth, breakpoints },
    }
    mergeCodeProps(propsCode, [
        propsDefault, themedPropsDefault && themedPropsDefault(theme),
        propsOverride, themedPropsOverride && themedPropsOverride(theme),
        propsRest, themedProps && themedProps(theme),
    ])

    const getStylePropsWeb = (...rulesets: TTyped.RulesetSimple[]) =>
        platform.styleProps(propsCode, rulesets) as TTyped.StylePropsWeb
    const getStylePropsRootWeb = (...rulesets: TTyped.RulesetSimple[]) =>
        platform.styleProps(propsCode, rulesets.length > 0 ? rulesets : [classes['root']], className, style) as TTyped.StylePropsWeb

    const getStylePropsNative = <R extends TTyped.RulesetIds>(...rulesets: TTyped.RulesetSimple<R>[]) =>
        platform.styleProps(propsCode, rulesets) as TTyped.StylePropsNative<R>
    const getStylePropsRootNative = <R extends TTyped.RulesetIds = O>(...rulesets: TTyped.RulesetSimple<R>[]) =>
        platform.styleProps(propsCode, rulesets.length > 0 ? rulesets : [classes['root']], className, style) as TTyped.StylePropsNative<R>

    return {
        propsCode, classes, className, style, getWidthMap,
        getStylePropsNative, getStylePropsRootNative, getStylePropsWeb, getStylePropsRootWeb
    }
}

const mergeCodeProps = (propsCode: TTyped.PropsCode | any, props: TComponents.Props[]) => {
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

export default useStyles