import { Utils } from 'reactxx-typings'

import $web from '../conditions/$web'
import $native from '../conditions/$native'
import $hot from '../conditions/$hot'
import $if from '../conditions/$if'
import $ifelse from '../conditions/$ifelse'
import $width from '../conditions/$widths/$width'

export const getTypedUtils = <P extends {}, Theme extends {} = {}>() => untyped as Utils<P, Theme>

const untyped = {
    $web,
    $native,
    $hot,
    $if,
    $ifelse,
    $width,
    $themed: p => p,
    $rules: p => p,
} as Utils<never, never>


