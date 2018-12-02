import React from 'react';
import { atomizeRuleset, atomizeSheet, atomizeStyle, mergeSheets, } from 'reactxx-sheeter';
import { TComponents, TEngine, TTyped, TUseSheeter } from 'reactxx-typings';

import {
    fromEngineClassName, fromEngineSheet, toEngineClassName, toEngineSheet,
    fromEngineStyle, toEngineStyle
} from '../utils/typed'

export const useProps = <R extends TTyped.Shape = TTyped.Shape>(theme, options: TUseSheeter.AuthorConfig, atomizedSheet: TEngine.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: _classes, classNameX: _classNameX, styleX: _styleX, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(toEngineSheet(_classes), theme, 'classes')
        return fromEngineSheet<R>(mergeSheets([atomizedSheet, classes]))
    }, [theme, _classes])

    // classNameX
    const classNameX = React.useMemo(
        () => fromEngineClassName<R>
            (atomizeRuleset(
                toEngineClassName(_classNameX),
                theme,
                'classes'
            )),
        [_classNameX, theme])

    // styleX
    const styleX = React.useMemo(() => fromEngineStyle<R>(atomizeStyle(toEngineStyle(_styleX), theme)), [_styleX])

    return { classes, classNameX, styleX, propsRest, themedProps }

}

