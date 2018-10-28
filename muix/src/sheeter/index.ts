// platform dependent exports
import { platform } from './$web'
import { createElement, finalizeClassName, applyLastwinsStrategy } from './reacts/$web'

export { createElement, finalizeClassName, applyLastwinsStrategy, platform }

export * from './utils/deep-merge'
export * from './atomize'
export * from './globals'
export * from './atomize-low'
export * from './variants'
export * from './merge'
export * from './to-classnames'
export * from './utils/wrap-pseudo-prefixes'
