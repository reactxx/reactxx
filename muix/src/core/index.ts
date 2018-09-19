// platform dependent exports
export * from './sheeter/$web'
export * from './reacts/$web'
export * from './primitives/$web'

export * from './d-index'

export * from './sheeter/atomize'
export * from './reacts/class-names'

//export { run as Test } from './tests/test'
export { default as Test } from './tests/primitives'

import {withStylesInit} from './with-style/with-styles'

withStylesInit()

