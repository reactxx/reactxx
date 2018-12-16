export * from './shapes'

import { initSheeter } from 'reactxx-styles'

import { getView, getIcon, getScrollView, getText } from './$native'
import { inits } from './inits'

const {
    initPlatform,
    View, ScrollView, Icon, Text, AnimatedView, AnimatedIcon, AnimatedText,
} = inits(getView, getIcon, getText, getScrollView)

export {
    View, ScrollView, Icon, Text, AnimatedView, AnimatedIcon, AnimatedText,
}

export const initPrimitives$Native = initPlatform

export const initPrimitives = (trace: Trace = {}) => {
    initSheeter(trace)
    initPlatform()
}

