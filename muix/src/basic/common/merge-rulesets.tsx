import * as Sheeter from 'reactxx-sheeter';
import { RenderAddIn } from 'reactxx-basic';
import { Types } from '../typings/types';
import warning from 'warning';

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
    const rulesets = classNamesLow(classes, false, rulesetsStr)
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

const classNamesLow = (classes, inner: boolean, pars: any[]) => {
  var rulesets = []

  for (let i = 0; i < pars.length; i++) {
    let arg = pars[i]
    if (!arg) continue

    warning(!Array.isArray(arg), 'Array is not allowed')

    var argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      rulesets.push(classes[arg])
    } else if (argType === 'object') {
      if (arg['#rulesetName'])
        rulesets.push(arg)
      else {
        let isMap = false
        for (const key in arg) {
          const argp = arg[key]
          if (argp === true || argp === false) {
            isMap = true
            if (argp) rulesets.push(classes[key])
          } else if (argp) {
            warning(!isMap, 'Cannot mix boolean and not empty value')
            rulesets.push(arg)
            break
          }
        }
      }
    }
  }
  return rulesets
}

const classNamesLow2 = (...pars: object[]) => {
  var classes = []

  for (let i = 0; i < pars.length; i++) {
    var arg = pars[i]
    if (!arg) continue

    if (arg['#rulesetName']) arg = arg['#rulesetName']

    var argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNamesLow2(...arg)
      if (inner) classes = classes.concat(inner)
    } else if (argType === 'object') {
      for (const key in arg) {
        if (arg[key]) classes.push(key)
      }
    }
  }
  return classes
}
