import * as Sheeter from 'reactxx-sheeter';
import { RenderAddIn } from 'reactxx-basic';
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

export const setClassNamesCreators = (finalProps: Types.CodeProps, getClassesPatches: Sheeter.RulesetPatchGetters, addIn: RenderAddIn) => {
  const classesStr = {}
  for (const p in finalProps.classes) classesStr[p] = p
  const classes = finalProps.classes
  finalProps.classes = classesStr
  const classNamesCreator = (isStr: boolean) => (...rulesetsStr: Sheeter.Ruleset[]) => {
    const rulesets = rulesetsStr.map((r: any) => r && (typeof r === 'string' ? classes[r] : r))
    const res = Sheeter.mergeRulesetsForCode(
      classes as Sheeter.SheetWithAddIns,
      getClassesPatches,
      rulesets
    ) as Types.TMergeRulesetsResult<any>
    return isStr ? addIn.rulesetsToClassNames(res) : res
  }
  (finalProps.$system as any).classNames = classNamesCreator(false);
  (finalProps.$system as any).classNamesStr = classNamesCreator(true)
}

const classNamesLow = (...pars: object[]) => {
  var classes = []

  for (let i = 0; i < pars.length; i++) {
    var arg = pars[i]
    if (!arg) continue

    if (arg['#rulesetName']) arg = arg['#rulesetName']

    var argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNamesLow(...arg)
      if (inner) classes = classes.concat(inner)
    } else if (argType === 'object') {
      for (const key in arg) {
        if (arg[key]) classes.push(key)
      }
    }
  }



  return classes
}