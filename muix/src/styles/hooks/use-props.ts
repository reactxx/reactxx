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
    const { classes: _classes, className: _className, style: _style, themedProps, ...propsRest } = props as TComponents.Props

    // merge sheet with classes
    const classes = React.useMemo(() => {
        const classes = atomizeSheet(TAsTypedSheet(_classes), theme, 'classes')
        return TAsEngineSheet<R>(mergeSheets([sheet, classes]))
    }, [_classes, theme])

    // className
    const className = React.useMemo(
        () => TAsEngineClassName<R>
            (atomizeRuleset(
                TAsTypedClassName(_className),
                theme,
                'classes'
            )),
        [_className, theme])

    // styles
    const style = React.useMemo(() => TAsEngineStyle<R>(atomizeStyle(TAsTypedStyle(_style), theme)), [_style, theme])

    return { classes, className, style, propsRest, themedProps }

}

