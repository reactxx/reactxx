import React from 'react';
import warning from 'warning'

import { sheetFromThemeCache } from './use-theme';
import { toEngineSheet } from '../utils/from-engine';
import { TUseSheeter } from '../typings/use-sheeter'


export const useDefaults = (
    theme, options: TUseSheeter.AuthorConfig, displayName: string,
) =>
    React.useMemo(() => getDefaults(theme, options, displayName), [theme, options, displayName])

const getDefaults = (theme, config: TUseSheeter.AuthorConfig & TUseSheeter.UserConfig, displayName: string) => {

    const { defaultProps, defaultSheet, overrideProps, overrideSheet, id} = config

    // if (!defaultSheet)
    //     throw 'Missing config.defaultsheet'

    const sheet = sheetFromThemeCache(id, toEngineSheet(defaultSheet), theme, toEngineSheet(overrideSheet), displayName) || {}

    if (window.__TRACE__) {
        if (defaultProps) {
            const { css, styles, classes } = defaultProps
            warning(!classes && !css && !styles, 'classes, css and styles are ignored in defautProps')
        }
        if (overrideProps) {
            const { css, styles, classes } = overrideProps
            warning(!classes && !css && !styles, 'classes, css and styles are ignored in overrideProps')
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
