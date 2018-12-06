import { TTyped } from 'reactxx-typings';
import { $width, $web, $native, $hot, $if, $ifelse } from '../queryable/index'
import { toClassNamesWithQuery } from '../utils/to-classnames'
import { mergeRulesets, mergeSheets } from '../utils/merge'
import { atomizeRuleset, atomizeSheet } from '../utils/atomize'

export const getEngine = <R extends TTyped.Shape>() => untypedEngine as TTyped.TypedEngine<R>

const untypedEngine = {
    WEB: $web,
    NATIVE: $native,
    HOT: $hot,
    IF: $if,
    IFELSE: $ifelse,
    WIDTH: $width,
    THEMED: p => p,
    STYLE: (...p) => p,
    $atomizeSheet: atomizeSheet as any,
    $mergeSheets: mergeSheets as any,
    $atomizeRuleset: atomizeRuleset as any,
    ATOMIZE: (...pars: any[]) => atomizeRuleset(pars, null, '$atomize'),
    $mergeRulesets: mergeRulesets as any,
    $toClassNames: toClassNamesWithQuery as any
} as TTyped.TypedEngine<TTyped.Shape>
