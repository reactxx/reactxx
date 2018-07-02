import { Consts, TFinishAddIn, AddInRulesetFilter, TSheet, TRuleset } from './sheeter'

const maxBreakpoint = 10000000

export interface RulesetDecoded {
  from: number
  to: number
}

export const finishAddInCreator: (onFinished?: (decodes: RulesetDecoded[]) => void) => TFinishAddIn = onFinished => (addIns, addInName) => {
  const addIn = addIns[addInName]
  for (const sheetName in addIn) {
    const sheet = addIn[sheetName]
    let map: {}
    const finished = {
      [Consts.data]: {
        path: sheet[Consts.data].path,
        map: map = {}
      }
      //[Consts.all]: window.isWeb ? {} : []
    }
    for (const rulesetName in sheet) {
      if (rulesetName.charAt(0) === '#') continue
      const ruleset = sheet[rulesetName] // rulesetName: '-320', '320-640', '640-'
      finished[rulesetName] = ruleset
      const interval = rulesetName.split('-').map((i, idx) => i ? parseInt(i) : idx == 0 ? 0 : maxBreakpoint) // [0,320], [320, 640], [640, 10000000]
      if (window.isWeb)
        map[rulesetName] = intervalToSelector(interval[0], interval[1])
      else {
        map[rulesetName] = { from: interval[0], to: interval[1] } as RulesetDecoded
      }
    }
    //if (!window.isWeb && onFinished) onFinished(finished[Consts.all] as any)
    addIn[sheetName] = finished as any
  }
}

export const rulesetFilterCreator: (windowWidth?: number) => AddInRulesetFilter = (windowWidth: number) => ({ addInSheet }) => {
  const maps = addInSheet[Consts.data].map
  const res: any = window.isWeb ? {} : []
  if (!windowWidth) windowWidth = 0
  for (const p in addInSheet) {
    if (p.charAt(0) === '#') continue
    const map = maps[p]
    const addInSheetp = addInSheet[p]
    if (window.isWeb)
      res[map] = addInSheetp
    else {
      if (map.from <= windowWidth && map.to > windowWidth) (res as Array<any>).push(addInSheetp)
    }
  }
  return window.isWeb ? [res] : res
}


const intervalToSelector = (start: number, end: number) => {
  if (start === 0) return `@media (max-width: ${end - 1}px)`
  if (end === maxBreakpoint) return `@media (min-width: ${start}px)`
  return `@media (min-width: ${start}px) and (max-width: ${end - 1}px)`
}


