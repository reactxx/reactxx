import { TWithStyles } from '../d-index'

export const globalOptionsInit = (options: TWithStyles.GlobalOptions = null) => {
  if (options) Object.assign(globalOptions, options)
}

export const globalOptions: TWithStyles.GlobalOptions = {}
