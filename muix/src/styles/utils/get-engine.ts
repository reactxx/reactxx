import { TTyped } from 'reactxx-typings';
import { WIDTH, WEB, NATIVE, HOT,     IF, IFELSE } from '../queryable/index'
import { toClassNamesWithQuery } from '../utils/to-classnames'
import { mergeRulesets, mergeSheets } from '../utils/merge'
import { atomizeRuleset, atomizeSheet } from '../utils/atomize'

export const getEngine = <R extends TTyped.Shape>() => untypedEngine as TTyped.TypedEngine<R>

const untypedEngine = {
    WEB,
    NATIVE,
    HOT,
    IF,
    IFELSE,
    WIDTH,
    THEMED: p => p,
    STYLE: (...p) => p,
    //ROOT: ((...p) => p) as any,
    //$atomizeSheet: atomizeSheet as any,
    //$mergeSheets: mergeSheets as any,
    //ATOMIZE: atomizeRuleset as any,
    ATOMIZE: (...pars: any[]) => atomizeRuleset(pars, null, '$atomize'),
    $mergeRulesets: mergeRulesets as any,
    $toClassNames: toClassNamesWithQuery as any
} as TTyped.TypedEngine<TTyped.Shape>
