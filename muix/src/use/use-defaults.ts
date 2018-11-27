import React from 'react';
import warning from 'warning'

import { TUseSheeter, TAtomize } from 'reactxx-typings';
import { sheetFromThemeCache } from './use-theme';
import { toEngineSheet } from 'reactxx-sheeter';

export const useDefaults = (
    theme, options: TUseSheeter.ComponentConfig
) =>
    React.useMemo(() => getDefaults(theme, options), [theme, options])

const getDefaults = (theme, config: TUseSheeter.ComponentConfig & TUseSheeter.ComponentConfigOverride) => {

    const { defaultProps, defaultSheet, overrideProps, overrideSheet, id, displayName } = config

    if (!defaultSheet)
        throw 'Missing config.defaultsheet'

    const sheet = sheetFromThemeCache(id, toEngineSheet(defaultSheet), theme, toEngineSheet(overrideSheet), displayName)

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
