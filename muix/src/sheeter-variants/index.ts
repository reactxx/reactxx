import { initVariant$animation } from 'reactxx-sheet-animation'
import { initVariant$mediaq } from '.reactxx-sheet-widths'
import { initVariant$sheetFlags } from 'reactxx-sheet-flags'

export const initSheeterVariants = () => {
    initVariant$animation()
    initVariant$mediaq()
    initVariant$sheetFlags()
}