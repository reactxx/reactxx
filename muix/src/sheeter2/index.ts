import {renderer} from 'reactxx-fela'
import {RulesetCompiler, GetPropIdFromValue, TSheeterCompiled} from './types'

export const rulesetCompiler: RulesetCompiler = renderer.renderRuleEx
export const getPropIdFromValue: GetPropIdFromValue = value => renderer.propIdCache[value as TSheeterCompiled.ValueWeb]

export {run} from './test'
