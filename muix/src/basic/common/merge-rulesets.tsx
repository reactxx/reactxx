import { RenderAddIn } from 'reactxx-basic';
import * as Sheeter from 'reactxx-sheeter';
import { Types } from '../typings/types';

export const mergeRulesetsCreator = (classes: Sheeter.SheetWithAddIns, getClassesPatches: Sheeter.RulesetPatchGetters) => (...rulesets: Sheeter.Ruleset[]) => {
  const res = Sheeter.mergeRulesetsForCode(
    classes as Sheeter.SheetWithAddIns,
    getClassesPatches,
    rulesets
  ) as Types.TMergeRulesetsResult<any>
  // if ($system.$developer_flag) {
  //   console.log(
  //     `### mergeRulesets for ${displayName}`,
  //     res
  //   )
  // }
  return res
}

export const classNamesCreator = (isStr: boolean, classes: Sheeter.SheetWithAddIns, getClassesPatches: Sheeter.RulesetPatchGetters, addIn: RenderAddIn) => (...rulesetsStr: Sheeter.Ruleset[]) => {
  const ruleset = Sheeter.mergeRulesetsForCode(
    classes as Sheeter.SheetWithAddIns,
    getClassesPatches,
    rulesetsStr
  ) as Types.TMergeRulesetsResult<any>
  const res = isStr ? addIn.rulesetsToClassNames(ruleset) : ruleset
  return res
}