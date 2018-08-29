import React from 'react';
import { TCommon } from '../typings/common';
import { Types } from '../typings/types';
import { RenderAddIn, TRenderState } from './withStyles';
import { TAddIn } from '../typings/add-in';
export declare const getSystemPipes: <R extends Types.Shape>(id: number, displayName: string, sheetCreator: Types.themeCreator<R, Types.SheetX<R>>, addIns: RenderAddIn, options: Types.WithStyleOptions_ComponentX<R>) => {
    propsPipe: (input: () => {
        props: PartialOverwrite<TCommon.EmptySheet, Types.PropsXEx<Types.Shape> & PartialRecord<TCommon.TEvents, (event: Types.MouseEventPar<Types.Shape>) => void> & TAddIn.PropsX<Types.Shape>>;
        renderState: TRenderStateEx;
    }, output: (par: Types.CodeProps<Types.Shape>) => void, next: () => React.ReactNode) => () => {};
    stylePipe: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode;
    renderComponentPipe: (renderState: TRenderState, CodeComponent: React.ComponentType<Types.CodeProps<Types.Shape>>) => () => JSX.Element;
    cascadingProvider: React.ComponentClass<PartialOverwrite<R["props"], Types.PropsXEx<R> & PartialRecord<R["events"], (event: Types.MouseEventPar<R>) => void> & TAddIn.PropsX<R>>>;
};
export declare const hasPlatformEvents: (cpx: Types.CodeProps<Types.Shape>) => (event: React.MouseEvent<Element>) => void;
interface TRenderStateEx extends TRenderState {
    separatedStyles?: AccumulatedStylesAndProps;
}
interface AccumulatedStylesAndProps extends Types.AccumulatedStylesFromProps {
    props: (Types.ThemedPropsX | Types.PropsX)[];
}
export {};
