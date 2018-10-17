// import { TSheeter } from 'reactxx-typings';

// const maxBreakpoint = 10000000

// export const mediaqFinishAddInCreator = (sheet: Record<string, TSheeter.RulesetOrAtomized>) => {
//   const map = {}
//   for (const rulesetName in sheet) {
//     if (rulesetName.charAt(0) === '#') continue
//     const ruleset = sheet[rulesetName] // rulesetName: '-320', '320-640', '640-'
//     //finished[rulesetName] = ruleset
//     const interval = rulesetName.split('-').map((i, idx) => i ? addBreakpoint(i) : idx == 0 ? 0 : maxBreakpoint) // [0,320], [320, 640], [640, 10000000]
//     if (window.isWeb)
//       map[rulesetName] = intervalToSelector(interval[0], interval[1])
//     else
//       map[rulesetName] = { from: interval[0], to: interval[1] }
//   }
// }

// const intervalToSelector = (from: number, to: number) => {
//   if (from === 0) return `@media (max-width: ${to - 1}px)`
//   if (to === maxBreakpoint) return `@media (min-width: ${from}px)`
//   return `@media (min-width: ${from}px) and (max-width: ${to - 1}px)`
// }


