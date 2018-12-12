import React from 'react';
import warning from 'warning'

import { sheetFromThemeCache } from './use-theme';
import { TAsTypedSheet } from 'reactxx-styles';
import { TComponents } from 'reactxx-typings'


export const useDefaults = (
    theme, options: TComponents.Config, displayName: string,
) =>
    React.useMemo(() => getDefaults(theme, options, displayName), [theme, options, displayName])

const getDefaults = (theme, config: TComponents.AuthorConfig & TComponents.UserConfig, displayName: string) => {

    const { defaultProps, defaultSheet, overrideProps, overrideSheet, componentId} = config

    const sheet = sheetFromThemeCache(componentId, TAsTypedSheet(defaultSheet), theme, TAsTypedSheet(overrideSheet), displayName) || {}

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
