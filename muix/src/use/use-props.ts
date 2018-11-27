import React from 'react';

import { TTyped, TAtomize, TComponents, TUseSheeter, TSheeter, TVariants } from 'reactxx-typings';
import { atomizeSheet, atomizeRuleset, atomizeStyle, mergeSheets, typeSheetCreator, typeClassNameCreator, untypeSheetCreator, untypeClassNameCreator } from 'reactxx-sheeter'

export const useProps = <R extends TSheeter.Shape = TSheeter.Shape>(theme, options: TUseSheeter.ComponentConfig, atomizedSheet: TAtomize.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: _classes, classNameX: _classNameX, styleX: _styleX, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(untypeSheetCreator(_classes), theme, 'classes')
        return typeSheetCreator<R>(mergeSheets([atomizedSheet, classes]))
    }, [theme, _classes])

    // classNameX
    const classNameX = React.useMemo(() => typeClassNameCreator<R>(atomizeRuleset(untypeClassNameCreator( _classNameX), theme, 'classes')), [_classNameX, theme])

    // styleX
    const styleX = React.useMemo(() => atomizeStyle(_styleX, theme, 'styleX'), [_styleX])

    return { classes, classNameX, styleX, propsRest, themedProps }

}

