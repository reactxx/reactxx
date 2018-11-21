import warning from 'warning'
import {isTemporary} from './atomize-low'

export const createWithTheme = (valueOrCreator: ((theme) => any) | any, theme) => {
  if (typeof valueOrCreator === 'function' && !isTemporary(valueOrCreator)) {
    warning(theme, 'Theme expected (ThemeProvider or getDefaultTheme missing)')
    // apply creator to theme:
    return valueOrCreator(theme)
  }
  else
    // return value
    return valueOrCreator
};