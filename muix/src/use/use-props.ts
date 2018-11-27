import React from 'react';

import { TTyped, TAtomize, TComponents, TUseSheeter, TSheeter, TVariants } from 'reactxx-typings';
import { atomizeSheet, atomizeRuleset, atomizeStyle, mergeSheets } from 'reactxx-sheeter'

export const useProps = <R extends TSheeter.Shape = TSheeter.Shape>(theme, options: TUseSheeter.ComponentConfig, sheet: TAtomize.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: _classes, classNameX: _classNameX, styleX: _styleX, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(_classes as TAtomize.SheetOrCreator, theme, 'classes')
        return mergeSheets([sheet, classes]) as any as TTyped.Sheet<R>
    }, [theme, _classes])

    // classNameX
    const classNameX = React.useMemo(() => atomizeRuleset(_classNameX, theme, 'classes') as any as TTyped.Ruleset<TVariants.getClassName<R>>, [_classNameX, theme])

    // styleX
    const styleX = React.useMemo(() => atomizeStyle(_styleX, theme, 'styleX'), [_styleX])

    return { classes, classNameX, styleX, propsRest, themedProps }

}

