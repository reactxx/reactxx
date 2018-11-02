// platform dependent exports
export * from './$native'

export * from './d-index'

import {initGlobals} from './sheets'
import { init } from './$native'

export const initPrimitives = (force?: boolean) => initGlobals(force, init)
export const initPrimitives$Native = initPrimitives

initPrimitives$Native()

