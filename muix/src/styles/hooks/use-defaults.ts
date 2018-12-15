import React from 'react';
import { TComponents, TTyped } from 'reactxx-typings'

import { mergePropsCode } from '../utils/merge'
import { sheetFromThemeCache } from './use-theme';
import { platform } from '../utils/globals';


export const useDefaults = (theme, options: TComponents.Config) =>
    React.useMemo(() => getDefaults(theme, options), [theme, options])

const getDefaults = (theme, config: TComponents.Config) => {

    //on demand componentId initialization and missing displayName fix
    if (!config.componentId) config.componentId = ++platform._styles.componentIdCounter
    if (!config.displayName) config.displayName = `comp-${config.componentId}`

    const { $props, $sheet, componentId, displayName } = config

    const sheet = sheetFromThemeCache(componentId, $sheet, theme, displayName) || {}

    let propsDefault: TTyped.PropsCode = null
    if ($props) {
        const res = []
        for (const props of $props) {
                res.push(props)
                if (props.themedProps)
                    res.push(props.themedProps(theme))
        }

        propsDefault = {}
        mergePropsCode(propsDefault, res)
    }

    // if (window.__TRACE__) {
    //     if (authorProps) {
    //         const { className, style, classes } = authorProps
    //         warning(!classes && !className && !style, 'classes, className and styles are ignored in defautProps')
    //     }
    //     if (userProps) {
    //         const { className, style, classes } = userProps
    //         warning(!classes && !className && !style, 'classes, className and styles are ignored in overrideProps')
    //     }
    // }

    return {
        sheet,
        propsDefault
        // propsDefault: authorProps,
        // themedPropsDefault: authorProps && authorProps.themedProps,
        // propsOverride: userProps,
        // themedPropsOverride: userProps && userProps.themedProps,
    }

}
