import warning from 'warning'

import { Types } from 'reactxx-basic'

const createSheetHook = (sheetCreator: Types.SheetCreatorX) => {
  if (typeof sheetCreator === 'function')
    return (theme, par) => modifySheet(sheetCreator(theme, par))
  else
    return modifySheet(sheetCreator)
}

const modifySheet = sheet => {
  for (const rulesetName in sheet) modifyRuleset(sheet, rulesetName)
  return sheet
}

const modifyRuleset = (sheet: {}, rulesetName: string) => {
  const ruleset = sheet[rulesetName]
  let $whenUsed = null
  Object.keys(ruleset).forEach(ruleName => {
    const rule = ruleset[ruleName]
    const pseudoClasses = rx$pseudoClasses.exec(ruleName)
    if (pseudoClasses) {
      ruleset[':' + pseudoClasses[1]] = rule
      delete ruleset[ruleName]
    } else {
      const whenUsed = rx$whenUsed.exec(ruleName)
      if (whenUsed) {
        ($whenUsed || ($whenUsed = {}))[whenUsed[1]] = rule
        delete ruleset[ruleName]
      }
    }
  })
  if ($whenUsed)
    ruleset['$whenUsed'] = $whenUsed
}

const rx$pseudoClasses = /&:(\w+)$/
const rx$whenUsed = /&\$(\w+)$/

//&::-moz-focus-inner

export default createSheetHook