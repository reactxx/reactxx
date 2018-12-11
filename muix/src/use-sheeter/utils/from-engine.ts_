import { TEngine, TTyped } from 'reactxx-typings';

export const TAsEngineClassName = <R extends TTyped.Shape>(r: TEngine.RulesetOrCreator) => r as TTyped.ClassNameSimple<R>
export const TAsTypedClassName = (r: TTyped.RulesetOrCreator) => r as TEngine.RulesetOrCreator

export const TAsEngineSheet = <R extends TTyped.Shape>(r: TEngine.SheetOrCreator) => r as any as TTyped.SheetSimple<R>
export const TAsTypedSheet = (r: TTyped.PartialSheetOrCreator) => r as any as TEngine.Sheet

export const TAsEngineStyle = <R extends TTyped.Shape>(r: TEngine.StyleOrCreator) => r as any as TTyped.StyleSimple<R>
export const TAsTypedStyle = (r: TTyped.StyleOrCreator) => r as any as TEngine.Style

// export function isReactXXComponent(obj): obj is TEngine.IsReactXXComponent {
//     return (obj as TEngine.IsReactXXComponent).$c$
// }