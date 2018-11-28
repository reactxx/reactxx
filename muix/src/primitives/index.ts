// platform dependent exports
export * from './$web'
export * from './shapes'

import { getView, getIcon, getScrollView, getText} from './$web'
import {inits} from './inits'

const { initPrimitives, viewCreator, View } = inits(getView, getIcon, getScrollView, getText)

export {initPrimitives, viewCreator, View}
export const initPrimitives$Web = initPrimitives
