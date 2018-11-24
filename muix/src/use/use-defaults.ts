import React from 'react';
import warning from 'warning'

import { TWithStyles } from 'reactxx-typings';
import { sheetFromThemeCache } from './use-theme';

export const useDefaults = (
    theme, options: TWithStyles.ComponentConfig
) =>
    React.useMemo(() => getDefaults(theme, options), [theme, options])

const getDefaults = (theme, config: TWithStyles.ComponentConfig & TWithStyles.ComponentConfigOverride) => {

    const { defaultProps, defaultSheet, overrideProps, overrideSheet, id, displayName } = config

    warning(!!defaultSheet, 'Missing config.defaultsheet')

    const sheet = sheetFromThemeCache(id, defaultSheet, theme, overrideSheet, displayName)

    if (window.__TRACE__) {
        if (defaultProps) {
            const { classNameX, styleX, classes } = defaultProps
            warning(!classes && !classNameX && !styleX, 'classes, classNameX and styleX are ignored in defautProps')
        }
        if (overrideProps) {
            const { classNameX, styleX, classes } = overrideProps
            warning(!classes && !classNameX && !styleX, 'classes, classNameX and styleX are ignored in overrideProps')
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
