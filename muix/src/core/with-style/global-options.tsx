import { TWithStyles } from '../index-d'

export const initGlobalOptions = (options?: TWithStyles.GlobalOptions) => {
  if (options) Object.assign(globalOptions, options)
}

export const globalOptions: TWithStyles.GlobalOptions = {}
