import warning from 'warning';

import {RulesetCompiler, GetPropIdFromValue, TSheeterCompiled} from './types'

export const rulesetCompiler: RulesetCompiler = style => null
export const getPropIdFromValue: GetPropIdFromValue = value => (value as TSheeterCompiled.ValueNative).propId
