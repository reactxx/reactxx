import { TFinishAddIn, AddInRulesetFilter, TSheet, TRuleset } from './sheeter'

export const enum Consts {
  maxBreakpoint = 10000000
}

export interface RulesetDecoded {
  from: number
  to: number
  ruleset: TRuleset
}

export const finishAddInCreator: (onFinished?: (decodes: RulesetDecoded[]) => void) => TFinishAddIn = onFinished => (addIns, addInName) => {
  const addIn = addIns[addInName]
  for (const sheetName in addIn) {
    const sheet = addIn[sheetName]
    const webRuleset: TSheet = {
      '#path': sheet['#path'],
      '*': {}
    }
    const nativeRulesets = {
      '#path': sheet['#path'],
      '*': [] as RulesetDecoded[]
    }
    for (const rulesetName in sheet) {
      if (rulesetName.charAt(0) === '#') continue
      const ruleset = sheet[rulesetName] // rulesetName: '-320', '320-640', '640-'
      const interval = rulesetName.split('-').map((i, idx) => i ? parseInt(i) : idx == 0 ? 0 : Consts.maxBreakpoint) // [0,320], [320, 640], [640, 10000000]
      if (window.isWeb)
        webRuleset['*'][intervalToSelector(interval[0], interval[1])] = ruleset
      else
        nativeRulesets['*'].push({ from: interval[0], to: interval[1], ruleset })
    }
    if (!window.isWeb && onFinished) onFinished(nativeRulesets['*'])
    addIn[sheetName] = window.isWeb ? webRuleset : nativeRulesets as any
  }
}

export const rulesetFilterCreator: (windowWidth?: number) => AddInRulesetFilter = (windowWidth: number) => ({ addInSheet }) => {
  if (window.isWeb)
    return [addInSheet['*']]
  else {
    const res: TRuleset[] = []
    const decodes: RulesetDecoded[] = addInSheet['*'] as any
    if (!windowWidth) windowWidth = 0
    decodes.forEach(decoded => {
      if (decoded.from <= windowWidth && decoded.to > windowWidth) res.push(decoded.ruleset)
    })
    return res
  }
}


const intervalToSelector = (start: number, end: number) => {
  if (start === 0) return `@media (max-width: ${end - 1}px)`
  if (end === Consts.maxBreakpoint) return `@media (min-width: ${start}px)`
  return `@media (min-width: ${start}px) and (max-width: ${end - 1}px)`
}


