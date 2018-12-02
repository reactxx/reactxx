import { TEngine, TTyped, TComponents } from 'reactxx-typings';
import $hot from '../../sheeter/queryable/$hot';
import { $if, $ifelse } from '../../sheeter/queryable/$if';
import $native from '../../sheeter/queryable/$native';
import $web from '../../sheeter/queryable/$web';
import $width from '../../sheeter/queryable/$widths/$width';
import { atomizeRuleset, atomizeSheet } from '../../sheeter/utils/atomize';
import { mergeRulesets, mergeSheets } from '../../sheeter/utils/merge';
import { toClassNamesWithQuery } from '../../sheeter/utils/to-classnames';

export const getTypedEngine = <R extends TTyped.Shape>() => untypedEngine as TTyped.TypedEngine<R>

const untypedEngine = {
    $web,
    $native,
    $hot,
    $if,
    $ifelse,
    $width,
    $themed: p => p,
    $rules: (...p) => p,
    $atomizeSheet: atomizeSheet as any,
    $mergeSheets: mergeSheets as any,
    $atomizeRuleset: atomizeRuleset as any,
    $atomize: (...pars: any[]) => atomizeRuleset(pars, null, '$atomize'),
    $mergeRulesets: mergeRulesets as any,
    $toClassNames: toClassNamesWithQuery as any
} as TTyped.TypedEngine<TTyped.Shape>

export const fromEngineClassName = <R extends TTyped.Shape>(r: TEngine.RulesetOrCreator) => r as TTyped.ClassNameSimple<R>
export const toEngineClassName = (r: TTyped.RulesetOrCreator) => r as TEngine.RulesetOrCreator

export const fromEngineSheet = <R extends TTyped.Shape>(r: TEngine.SheetOrCreator) => r as any as TTyped.SheetSimple<R>
export const toEngineSheet = (r: TTyped.SheetOrCreator) => r as TEngine.Sheet

export const fromEngineStyle = <R extends TTyped.Shape>(r: TEngine.StyleOrCreator) => r as any as TTyped.StyleSimple<R>
export const toEngineStyle = (r: TTyped.StyleOrCreator) => r as TEngine.Style

export function isReactXXComponent(obj): obj is TEngine.IsReactXXComponent {
    return (obj as TEngine.IsReactXXComponent).$c$
}