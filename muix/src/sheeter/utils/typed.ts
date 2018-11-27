import { TTyped, TVariants, TAtomize } from 'reactxx-typings'

import $web from '../conditions/$web'
import $native from '../conditions/$native'
import $hot from '../conditions/$hot'
import $if from '../conditions/$if'
import $ifelse from '../conditions/$ifelse'
import $width from '../conditions/$widths/$width'

import { atomizeRuleset, atomizeSheet } from './atomize'
import { mergeSheets, mergeRulesets } from './merge'
import { toClassNamesWithQuery } from './to-classnames'
import { Task } from 'react-native';

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
    $mergeRulesets: mergeRulesets as any,
    $toClassNames: toClassNamesWithQuery as any
} as TTyped.Utils<TVariants.ShapePart>

export const typeClassNameCreator = <R extends TVariants.ShapePart>(r: TAtomize.RulesetOrCreator) => r as TTyped.RulesetOrCreator<R>
export const untypeClassNameCreator = (r: TTyped.RulesetOrCreator) => r as TAtomize.RulesetOrCreator

export const typeSheetCreator = <R extends TVariants.ShapePart>(r: TAtomize.SheetOrCreator) => r as any as TTyped.Sheet<R>
export const untypeSheetCreator = (r: TTyped.SheetOrCreator) => r as TAtomize.Sheet
