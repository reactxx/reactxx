import { TTyped, TVariants, TEngine } from 'reactxx-typings'

import $web from '../conditions/$web'
import $native from '../conditions/$native'
import $hot from '../conditions/$hot'
import $if from '../conditions/$if'
import $ifelse from '../conditions/$ifelse'
import $width from '../conditions/$widths/$width'

import { atomizeRuleset, atomizeSheet } from './atomize'
import { mergeSheets, mergeRulesets } from './merge'
import { toClassNamesWithQuery } from './to-classnames'

export const getSheetUtils = <R extends TVariants.ShapePart>() => untyped as TTyped.Utils<R>

const untyped = {
    $web,
    $native,
    $hot,
    $if,
    $ifelse,
    $width,
    $themed: p => p,
    $rules: p => p,
    $atomizeSheet: atomizeSheet as any,
    $mergeSheets: mergeSheets as any,
    $atomizeRuleset: atomizeRuleset as any,
    $atomize: (...pars:any[]) => atomizeRuleset(pars, null, '$atomize'),
    $mergeRulesets: mergeRulesets as any,
    $toClassNames: toClassNamesWithQuery as any
} as TTyped.Utils<TVariants.ShapePart>

export const fromEngineClassName = <R extends TVariants.ShapePart>(r: TEngine.RulesetOrCreator) => r as TTyped.ClassNameSimple<R>
export const toEngineClassName = (r: TTyped.RulesetOrCreator) => r as TEngine.RulesetOrCreator

export const fromEngineSheet = <R extends TVariants.ShapePart>(r: TEngine.SheetOrCreator) => r as any as TTyped.SheetSimple<R>
export const toEngineSheet = (r: TTyped.SheetOrCreator) => r as TEngine.Sheet
