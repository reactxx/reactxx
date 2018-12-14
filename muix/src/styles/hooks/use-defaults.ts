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
    if (!config.displayName) config.displayName = `comp-${config.componentId}`

    const { props, sheet: _sheet, componentId, displayName } = config
    const [authorProps, userProps] = props
    const [authorSheet, userSheet] = _sheet

    const sheet = sheetFromThemeCache(
        componentId, TAsTypedSheet(authorSheet), theme, TAsTypedSheet(userSheet), displayName
    ) || {}

    if (window.__TRACE__) {
        if (authorProps) {
            const { className, style, classes } = authorProps
            warning(!classes && !className && !style, 'classes, className and styles are ignored in defautProps')
        }
        if (userProps) {
            const { className, style, classes } = userProps
            warning(!classes && !className && !style, 'classes, className and styles are ignored in overrideProps')
        }
    }

    return {
        sheet,
        propsDefault: authorProps,
        themedPropsDefault: authorProps && authorProps.themedProps,
        propsOverride: userProps,
        themedPropsOverride: userProps && userProps.themedProps,
    }

}
