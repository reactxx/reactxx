export * from './shapes'
export { useActive } from './use-active'
export { default as Ripple } from './ripple'

import { initSheeter } from 'reactxx-styles'

import { getView, getIcon, getScrollView, getText } from './$web'
import { inits } from './inits'

const {
    initPlatform,
    View, ScrollView, Icon, Text, AnimatedView, AnimatedIcon, AnimatedText,
} = inits(getView, getIcon, getText, getScrollView)

export {
    View, ScrollView, Icon, Text, AnimatedView, AnimatedIcon, AnimatedText,
}
export const initPrimitives$Web = initPlatform

export const initPrimitives = (trace: Trace = {}) => {
    initSheeter(trace)
    initPlatform()
}

