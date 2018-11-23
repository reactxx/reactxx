import React from 'react';
import warning from 'warning'

import { TWithStyles } from 'reactxx-typings';
import { sheetFromThemeCache } from './use-theme';

export const useDefaults = (theme, options: TWithStyles.ComponentOptions) =>
    React.useMemo(() => getDefaults(theme, options), [theme, options])

const getDefaults = (theme, options: TWithStyles.ComponentOptions) => {
    const { defaultProps, sheetOrCreator, componentId, displayName } = options

    if (defaultProps) {
        const { classNameX, styleX, themedProps, classes, ...defaultPropsRest } = defaultProps

        warning(!classNameX && !styleX, 'classNameX and styleX are ignored in defautProps')

        const sheet = sheetFromThemeCache(componentId, sheetOrCreator, theme, classes, displayName)

        return {
            sheet,
            propsDefault: defaultPropsRest,
            themedPropsDefault: themedProps
        }
    } else {
        return {
            sheet: sheetFromThemeCache(componentId, sheetOrCreator, theme, null, displayName),
            propsDefault: null,
            themedPropsDefault: null
        }
    }

}
