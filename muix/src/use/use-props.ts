import React from 'react';

import { TAtomize, TComponents, TUseSheeter, TSheeter } from 'reactxx-typings';
import { atomizeSheet, atomizeRuleset, atomizeStyle, mergeSheets } from 'reactxx-sheeter'

export const useProps = <R extends TSheeter.Shape = TSheeter.Shape>(theme, options: TUseSheeter.ComponentConfig, sheet: TAtomize.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: _classes, classNameX: _classNameX, styleX: _styleX, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(_classes, theme, 'classes')
        return mergeSheets([sheet, classes])
    }, [theme, _classes]) as TAtomize.Sheet<R>

    // classNameX
    const classNameX = React.useMemo(() => atomizeRuleset(_classNameX, theme, 'classes'), [_classNameX, theme])

    // styleX
    const styleX = React.useMemo(() => atomizeStyle(_styleX, theme, 'styleX'), [_styleX])

    return { classes, classNameX, styleX, propsRest, themedProps }

}

