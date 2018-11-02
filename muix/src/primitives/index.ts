// platform dependent exports
export * from './$web'

export * from './d-index'

import {initGlobals} from './sheets'
import { init } from './$web'

export const initPrimitives = (force?: boolean) => initGlobals(force, init)
export const initPrimitives$Web = initPrimitives

initPrimitives$Web()

