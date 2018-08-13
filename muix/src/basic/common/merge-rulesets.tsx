import * as Sheeter from 'reactxx-sheeter';
import { Types } from '../typings/types';
// !!! platform dependent import
import { rulesetsToClassNames } from 'reactxx-basic';

export const mergeRulesetsCreator = (classes: Sheeter.SheetWithAddIns, getClassesPatches: Sheeter.RulesetPatchGetters) => (...rulesets: Sheeter.Ruleset[]) => {
  return Sheeter.mergeRulesetsForCode(
    classes as Sheeter.SheetWithAddIns,
    getClassesPatches,
    rulesets
  ) as Types.TMergeRulesetsResult<any>
}
export const mergeRulesetsCreatorStr = (classes: Sheeter.SheetWithAddIns, getClassesPatches: Sheeter.RulesetPatchGetters, rulesetsToClassNames: (...rulesets: React.CSSProperties[]) => string) => (...rulesets: Sheeter.Ruleset[]) => {
  const res = Sheeter.mergeRulesetsForCode(
    classes as Sheeter.SheetWithAddIns,
    getClassesPatches,
    rulesets
  ) as Types.TMergeRulesetsResult<any>
  return rulesetsToClassNames ? rulesetsToClassNames(res) : res
}

export const classNames = (...rulesets: React.CSSProperties[]) => {
  if (!rulesets || (rulesets = rulesets.filter(r => !!r)).length === 0) return null
  return rulesets.length === 1 ? rulesets[0] : Sheeter.deepMerges({}, rulesets)
}

export const classNamesStr = (...rulesets: React.CSSProperties[]) => {
  const merged = classNames(...rulesets)
  return rulesetsToClassNames ? rulesetsToClassNames(merged) : merged
}



// export const classNamesCreator = (isStr: boolean, classes: Sheeter.SheetWithAddIns, getClassesPatches: Sheeter.RulesetPatchGetters, addIn: RenderAddIn) => (...rulesetsStr: Sheeter.Ruleset[]) => {
//   const ruleset = Sheeter.mergeRulesetsForCode(
//     classes as Sheeter.SheetWithAddIns,
//     getClassesPatches,
//     rulesetsStr
//   ) as Types.TMergeRulesetsResult<any>
//   const res = isStr ? addIn.rulesetsToClassNames(ruleset) : ruleset
//   return res
// }