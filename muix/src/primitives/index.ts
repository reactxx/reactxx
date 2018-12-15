export * from './shapes'
export { useActive } from './use-active'
export { default as Ripple } from './ripple'

import { initSheeter } from 'reactxx-styles'

import { getView, getIcon, getScrollView, getText } from './$web'
import { inits } from './inits'

const {
    initPlatform,
    viewCreator, View,
    scrollViewCreator, ScrollView,
    iconCreator, Icon,
    textCreator, Text,
    animatedViewCreator, AnimatedView,
    animatedIconCreator, AnimatedIcon,
    animatedTextCreator, AnimatedText,
} = inits(getView, getIcon, getText, getScrollView)

export {
    viewCreator, View, getView,
    scrollViewCreator, ScrollView, getScrollView,
    iconCreator, Icon, getIcon,
    textCreator, Text, getText,
    animatedViewCreator, AnimatedView,
    animatedIconCreator, AnimatedIcon,
    animatedTextCreator, AnimatedText,
}
export const initPrimitives$Web = initPlatform

export const initPrimitives = (trace: Trace = {}) => {
    initSheeter(trace)
    initPlatform()
}

