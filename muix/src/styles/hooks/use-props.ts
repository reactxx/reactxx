import React from 'react';
import {
    atomizeRuleset, atomizeSheet, atomizeStyle, mergeSheets,
    TAsTypedClassName, TAsEngineClassName,
    TAsTypedSheet, TAsEngineSheet,
    TAsTypedStyle, TAsEngineStyle
} from 'reactxx-styles';
import { TEngine, TTyped, TComponents } from 'reactxx-typings';

export const useProps = <R extends TTyped.Shape = TTyped.Shape>(theme, sheet: TEngine.Sheet, props: TComponents.Props) => {
    // from props
    const { classes: classes_, className: className_, style: style_, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        if (!classes_) return TAsTypedSheet<R>(sheet)
        const classes = atomizeSheet(TAsEngineSheet(classes_), theme, 'classes')
        const res = TAsTypedSheet<R>(mergeSheets([sheet, classes]))
        return res
    }, [classes_, theme])

    // className
    const className = React.useMemo(
        () => !className_ ? null : TAsTypedClassName<R>(atomizeRuleset(
            TAsEngineClassName(className_),
            theme,
            'classes'
        )),
        [className_, theme]
    )

    // styles
    const style = React.useMemo(
        () => !style_ ? null : TAsTypedStyle<R>(atomizeStyle(TAsEngineStyle(style_), theme)),
        [style_, theme]
    )

    return { classes, className, style, propsRest, themedProps }

}

