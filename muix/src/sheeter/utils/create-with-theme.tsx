import warning from 'warning'

export const createWithTheme = (valueOrCreator: ((theme) => any) | any, theme, makeFlatCopy?:boolean) => {
  if (typeof valueOrCreator === 'function') {
    warning(theme, 'Theme expected (ThemeProvider or getDefaultTheme missing)')
    // apply creator to theme:
    return valueOrCreator(theme)
  }
  else
    // return value
    return makeFlatCopy ? {...valueOrCreator} : valueOrCreator 
};