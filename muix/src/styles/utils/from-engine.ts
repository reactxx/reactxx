import { TEngine, TTyped } from 'reactxx-typings';

export const TAsTypedClassName = <R extends TTyped.Shape>(r: TEngine.RulesetOrCreator) => r as TTyped.ClassNameSimple<R>
export const TAsEngineClassName = (r: TTyped.RulesetOrCreator) => r as TEngine.RulesetOrCreator

export const TAsTypedSheet = <R extends TTyped.Shape>(r: TEngine.SheetOrCreator) => r as any as TTyped.SheetSimple<R>
export const TAsEngineSheet = (r: TTyped.PartialSheetOrCreator) => r as any as TEngine.Sheet

export const TAsTypedStyle = <R extends TTyped.Shape>(r: TEngine.StyleOrCreator) => r as any as TTyped.StyleSimple<R>
export const TAsEngineStyle = (r: TTyped.StyleOrCreator) => r as any as TEngine.Style
