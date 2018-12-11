import React from 'react';
import warning from 'warning'

import { sheetFromThemeCache } from './use-theme';
import { TAsTypedSheet } from 'reactxx-styles';
import { TComponents } from 'reactxx-typings'


export const useDefaults = (
    theme, options: TComponents.AuthorConfig, displayName: string,
) =>
    React.useMemo(() => getDefaults(theme, options, displayName), [theme, options, displayName])

const getDefaults = (theme, config: TComponents.AuthorConfig & TComponents.UserConfig, displayName: string) => {

    const { defaultProps, defaultSheet, overrideProps, overrideSheet, id} = config

    // if (!defaultSheet)
    //     throw 'Missing config.defaultsheet'

    const sheet = sheetFromThemeCache(id, TAsTypedSheet(defaultSheet), theme, TAsTypedSheet(overrideSheet), displayName) || {}

    if (window.__TRACE__) {
        if (defaultProps) {
            const { className: css, style, classes } = defaultProps
            warning(!classes && !css && !style, 'classes, css and styles are ignored in defautProps')
        }
        if (overrideProps) {
            const { className: css, style, classes } = overrideProps
            warning(!classes && !css && !style, 'classes, css and styles are ignored in overrideProps')
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
