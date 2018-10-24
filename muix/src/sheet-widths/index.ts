// platform dependent export
export * from './$web'

export * from './utils/pipe'
export * from './utils/atomize'
export * from './utils/provider'
export * from './variants'
export { onWidthChanged } from './utils/subscribe'

import { platform as p } from 'reactxx-sheeter'
import { PlatformWidth } from './variants'
export const platform = p as PlatformWidth

