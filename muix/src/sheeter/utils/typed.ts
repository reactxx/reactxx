import { TTyped } from 'reactxx-typings'

import $web from '../conditions/$web'
import $native from '../conditions/$native'
import $hot from '../conditions/$hot'
import $if from '../conditions/$if'
import $ifelse from '../conditions/$ifelse'
import $width from '../conditions/$widths/$width'

import {atomizeRuleset, atomizeSheet} from './atomize'
import {mergeSheets, mergeRulesets} from './merge'
import {toClassNamesWithQuery} from './to-classnames'

// export const atomizeRulesetTyped = atomizeRuleset
// export const atomizeSheetTyped = atomizeSheet as any as AtomizeSheet

export const getTypedUtils = <P extends {}, Theme extends {} = {}>() => untyped as TTyped.Utils<P, Theme>

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
} as TTyped.Utils<never, never>
