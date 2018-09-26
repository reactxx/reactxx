import { initVariant$animation } from './animation/index'
import { initVariant$mediaq } from './mediaq/index'
import { initVariant$whenFlag } from './when-flags/index'

export const initSheeterVariants = () => {
    initVariant$animation()
    initVariant$mediaq()
    initVariant$whenFlag()
}