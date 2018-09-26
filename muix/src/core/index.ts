// platform dependent exports
export * from './sheeter/$web'
export * from './reacts/$web'
//export * from './primitives/$web'

export * from './sheeter/atomize'
export * from './sheeter/atomize-low'
export * from './sheeter/trace'
export * from 'reactxx-core/sheeter/variants'
export * from './with-styles/with-styles'

//export { run as Test } from './tests/test'
//export { default as Test } from './tests/primitives'

import {initGlobalState} from './with-styles/with-styles'

initGlobalState()

