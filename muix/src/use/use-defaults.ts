import React from 'react';
import warning from 'warning'

import { TWithStyles } from 'reactxx-typings';
import { sheetFromThemeCache } from './use-theme';

export const useDefaults = (theme, options: TWithStyles.ComponentConfig) =>
    React.useMemo(() => getDefaults(theme, options), [theme, options])

const getDefaults = (theme, options: TWithStyles.ComponentConfig) => {
    const { defaultProps, sheetOrCreator, id, displayName } = options

    if (defaultProps) {
        const { classNameX, styleX, themedProps, classes, ...defaultPropsRest } = defaultProps

        warning(!classNameX && !styleX, 'classNameX and styleX are ignored in defautProps')

        const sheet = sheetFromThemeCache(id, sheetOrCreator, theme, classes, displayName)

        return {
            sheet,
            propsDefault: defaultPropsRest,
            themedPropsDefault: themedProps
        }
    } else {
        return {
            sheet: sheetFromThemeCache(id, sheetOrCreator, theme, null, displayName),
            propsDefault: null,
            themedPropsDefault: null
        }
    }

}
