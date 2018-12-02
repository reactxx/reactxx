import React from 'react';
import { atomizeRuleset, atomizeSheet, atomizeStyle, mergeSheets, } from 'reactxx-sheeter';
import { TEngine, TTyped } from 'reactxx-typings';
import { TComponents } from '../typings/components'

import {
    fromEngineClassName, toEngineClassName, 
    fromEngineSheet, toEngineSheet,
    fromEngineStyle, toEngineStyle
} from '../utils/from-engine'

export const useProps = <R extends TTyped.Shape = TTyped.Shape>(theme, atomizedSheet: TEngine.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: _classes, classNameX: _classNameX, styleX: _styleX, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(toEngineSheet(_classes), theme, 'classes')
        return fromEngineSheet<R>(mergeSheets([atomizedSheet, classes]))
    }, [theme, _classes])

    // classNameX
    const css = React.useMemo(
        () => fromEngineClassName<R>
            (atomizeRuleset(
                toEngineClassName(_classNameX),
                theme,
                'classes'
            )),
        [_classNameX, theme])

    // styleX
    const styles = React.useMemo(() => fromEngineStyle<R>(atomizeStyle(toEngineStyle(_styleX), theme)), [_styleX])

    return { classes, css, styles, propsRest, themedProps }

}

