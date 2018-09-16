import { TWithStyles } from '../index-d'

export const globalOptionsInit = (options: TWithStyles.GlobalOptions = null) => {
  if (options) Object.assign(globalOptions, options)
}

export const globalOptions: TWithStyles.GlobalOptions = {}
