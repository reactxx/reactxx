import warning from 'warning'

import { Types } from 'reactxx-basic'

const createSheetHook = (sheetCreator: Types.SheetCreatorX) => {
  if (typeof sheetCreator ==='function')
    return (theme, par) => {
      const sheet = sheetCreator(theme, par)
      debugger
      for (const rulesetName in sheet) 
        sheet[rulesetName] = modifyRuleset(sheet[rulesetName])
      return sheet
    }
  else
    warning(false, 'Only function is allowed in createSheetHook')
}

const modifyRuleset = ruleset => {
  return ruleset
}

export default createSheetHook