import React from 'react';
import { atomizeRuleset, atomizeSheet, atomizeStyle, mergeSheets, } from 'reactxx-sheeter';
import { TEngine, TTyped } from 'reactxx-typings';
import { TComponents } from '../typings/components'

import {
    TAsEngineClassName, TAsTypedClassName, 
    TAsEngineSheet, TAsTypedSheet,
    TAsEngineStyle, TAsTypedStyle
} from '../utils/from-engine'

export const useProps = <R extends TTyped.Shape = TTyped.Shape>(theme, sheet: TEngine.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: _classes, css: _css, styles: _styles, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(TAsTypedSheet(_classes), theme, 'classes')
        return TAsEngineSheet<R>(mergeSheets([sheet, classes]))
    }, [theme, _classes])

    // css
    const css = React.useMemo(
        () => TAsEngineClassName<R>
            (atomizeRuleset(
                TAsTypedClassName(_css),
                theme,
                'classes'
            )),
        [_css, theme])

    // styles
    const styles = React.useMemo(() => TAsEngineStyle<R>(atomizeStyle(TAsTypedStyle(_styles), theme)), [_styles])

    return { classes, css, styles, propsRest, themedProps }

}

