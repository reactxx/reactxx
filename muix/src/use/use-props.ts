import React from 'react';

import { TTyped, TEngine, TComponents, TUseSheeter, TSheeter, TVariants } from 'reactxx-typings';
import { atomizeSheet, atomizeRuleset, atomizeStyle, mergeSheets, fromEngineSheet, toEngineClassName, toEngineSheet, fromEngineClassName } from 'reactxx-sheeter'

export const useProps = <R extends TSheeter.Shape = TSheeter.Shape>(theme, options: TUseSheeter.ComponentConfig, atomizedSheet: TEngine.Sheet, props: TComponents.Props) => {
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
    const styleX = React.useMemo(() => atomizeStyle(_styleX, theme, 'styleX'), [_styleX])

    return { classes, classNameX, styleX, propsRest, themedProps }

}

