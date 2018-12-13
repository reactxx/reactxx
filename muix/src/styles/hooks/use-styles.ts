import { TTyped, TComponents, O } from 'reactxx-typings'
import { platform, useWidths } from 'reactxx-styles'

import { useDefaults } from './use-defaults'
import { useProps } from './use-props'
import { useTheme } from './use-theme'
import { mergePropsCode } from '../utils/merge'

export const useStylesUntyped = (props, config?) => useStyles(props, config) as any

export const useStyles = <R extends TTyped.Shape = TTyped.Shape>(
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
    mergePropsCode(propsCode, [
        propsDefault, themedPropsDefault && themedPropsDefault(theme),
        propsOverride, themedPropsOverride && themedPropsOverride(theme),
        propsRest, themedProps && themedProps(theme),
    ])

    // typed helpers for styling platform components (web's div, span etc, native Text, View etc)
    const getWebStyleProps = (...rulesets: TTyped.RulesetSimple[]) =>
        platform.getStyleProps(propsCode, rulesets) as TTyped.StylePropsWeb
    const getRootWebStyleProps = (...rulesets: TTyped.RulesetSimple[]) =>
        platform.getStyleProps(propsCode, rulesets.length > 0 ? rulesets : [classes['root']], className, style) as TTyped.StylePropsWeb

    const getNativeStyleProps = <R extends TTyped.RulesetIds>(...rulesets: TTyped.RulesetSimple<R>[]) =>
        platform.getStyleProps(propsCode, rulesets) as TTyped.StylePropsNative<R>
    const getRootNativeStyleProps = <R extends TTyped.RulesetIds = O>(...rulesets: TTyped.RulesetSimple<R>[]) =>
        platform.getStyleProps(propsCode, rulesets.length > 0 ? rulesets : [classes['root']], className, style) as TTyped.StylePropsNative<R>

    // platform events


    return {
        propsCode, classes, className, style,
        getWidthMap, // width helper
        getNativeStyleProps, getRootNativeStyleProps, getWebStyleProps, getRootWebStyleProps
    } as TComponents.UseStylesResult<R>
}

