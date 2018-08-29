import React from 'react';
import * as Sheeter from 'reactxx-sheeter';
import { TCommon } from '../typings/common';
import { Types } from '../typings/types';
import { TAddIn } from '../typings/add-in';
export interface TRenderState {
    themeContext?: TCommon.ThemeContext;
    platformProps?: Types.CodeProps;
    getPropsPatches?: Sheeter.PropsPatchGetters;
    finalProps?: Types.CodeProps;
    getClassesPatches?: Sheeter.RulesetPatchGetters;
    $developer_id?: string;
}
export interface RenderAddIn {
    propsAddInPipeline: (renderState: TRenderState, next: () => React.ReactNode) => () => React.ReactNode;
    styleAddInPipeline: (renderState: TRenderState, next: () => React.ReactNode) => () => React.ReactNode;
    getDefaultTheme?: () => TCommon.ThemeBase;
    createSheetHook?: (sheetCreator: Types.SheetCreatorX) => Types.SheetCreatorX;
    finishAddInProps?: Sheeter.FinishAddIns;
    finishAddInClasses?: Sheeter.FinishAddIns;
}
export declare const withStylesCreator: <R extends Types.Shape, TStatic extends {} = {}>(sheetCreator: Types.themeCreator<R, Types.SheetX<R>>, codeComponent: React.ComponentType<Types.CodeProps<R>>, options?: Types.WithStyleOptions_ComponentX<R>) => (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => React.ComponentClass<PartialOverwrite<R["props"], Types.PropsXEx<R> & PartialRecord<R["events"], (event: Types.MouseEventPar<R>) => void> & TAddIn.PropsX<R>>> & TProvider<R> & TStatic;
export declare const withStyles: <R extends Types.Shape, TStatic extends {} = {}>(sheetCreator: Types.SheetCreatorX<R>, addIns: RenderAddIn, options?: TCommon.WithStyleOptions, overrideOptions?: TCommon.WithStyleOptions) => (CodeComponent: any) => any;
export interface TProvider<R extends Types.Shape> {
    Provider: React.ComponentClass<Types.PropsX<R>>;
}
export declare type WithStyle<R extends Types.Shape> = React.ComponentClass<Types.PropsX<R>> & TProvider<R>;
export declare type WithStyleCreator<R extends Types.Shape> = (options?: Types.WithStyleOptions_ComponentX<R>) => WithStyle<R>;
export declare const variantToString: (...pars: Object[]) => string;
