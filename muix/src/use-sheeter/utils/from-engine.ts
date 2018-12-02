import { TEngine, TTyped } from 'reactxx-typings';

export const fromEngineClassName = <R extends TTyped.Shape>(r: TEngine.RulesetOrCreator) => r as TTyped.ClassNameSimple<R>
export const toEngineClassName = (r: TTyped.RulesetOrCreator) => r as TEngine.RulesetOrCreator

export const fromEngineSheet = <R extends TTyped.Shape>(r: TEngine.SheetOrCreator) => r as any as TTyped.SheetSimple<R>
export const toEngineSheet = (r: TTyped.SheetOrCreator) => r as TEngine.Sheet

export const fromEngineStyle = <R extends TTyped.Shape>(r: TEngine.StyleOrCreator) => r as any as TTyped.StyleSimple<R>
export const toEngineStyle = (r: TTyped.StyleOrCreator) => r as TEngine.Style

export function isReactXXComponent(obj): obj is TEngine.IsReactXXComponent {
    return (obj as TEngine.IsReactXXComponent).$c$
}