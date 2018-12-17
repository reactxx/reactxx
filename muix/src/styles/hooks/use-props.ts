import React from 'react';
import {
    atomizeRuleset, atomizeSheet, atomizeStyle, mergeSheets,
    TAsEngineClassName, TAsTypedClassName,
    TAsEngineSheet, TAsTypedSheet,
    TAsEngineStyle, TAsTypedStyle
} from 'reactxx-styles';
import { TEngine, TTyped, TComponents } from 'reactxx-typings';

export const useProps = <R extends TTyped.Shape = TTyped.Shape>(theme, sheet: TEngine.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: classes_, className: className_, style: style_, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        if (!classes_) return TAsEngineSheet<R>(sheet)
        const classes = atomizeSheet(TAsTypedSheet(classes_), theme, 'classes')
        const res = TAsEngineSheet<R>(mergeSheets([sheet, classes]))
        return res
    }, [classes_, theme])

    // className
    const className = React.useMemo(
        () => !className_ ? null : TAsEngineClassName<R>(atomizeRuleset(
            TAsTypedClassName(className_),
            theme,
            'classes'
        )),
        [className_, theme]
    )

    // styles
    const style = React.useMemo(
        () => !style_ ? null : TAsEngineStyle<R>(atomizeStyle(TAsTypedStyle(style_), theme)),
        [style_, theme]
    )

    return { classes, className, style, propsRest, themedProps }

}

