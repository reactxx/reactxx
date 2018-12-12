import React from 'react';
import warning from 'warning'

import { sheetFromThemeCache } from './use-theme';
import { TAsTypedSheet } from 'reactxx-styles';
import { TComponents } from 'reactxx-typings'
import { platform } from '../utils/globals';


export const useDefaults = (theme, options: TComponents.Config) =>
    React.useMemo(() => getDefaults(theme, options), [theme, options])

const getDefaults = (theme, config: TComponents.Config) => {

    //on demand componentId initialization and missing displayName fix
    if (!config.componentId) config.componentId = ++platform._styles.componentIdCounter
    if (!config.displayName) config.displayName = `Comp${config.componentId}`

    const { defaultProps, defaultSheet, overrideProps, overrideSheet, componentId, displayName } = config

    const sheet = sheetFromThemeCache(
        componentId, TAsTypedSheet(defaultSheet), theme, TAsTypedSheet(overrideSheet), displayName
    ) || {}

    if (window.__TRACE__) {
        if (defaultProps) {
            const { className, style, classes } = defaultProps
            warning(!classes && !className && !style, 'classes, className and styles are ignored in defautProps')
        }
        if (overrideProps) {
            const { className, style, classes } = overrideProps
            warning(!classes && !className && !style, 'classes, className and styles are ignored in overrideProps')
        }
    }

    return {
        sheet,
        propsDefault: defaultProps,
        themedPropsDefault: defaultProps && defaultProps.themedProps,
        propsOverride: overrideProps,
        themedPropsOverride: overrideProps && overrideProps.themedProps,
    }

}
