import warning from 'warning'

import { FinishAddIn } from '../index'
import { $animationsToCSS } from './web'
import { $animationsToInterpolate } from './native'

export const animationFinishAddInClasses: FinishAddIn = addInItem => {
  return window.isWeb ? $animationsToCSS(addInItem) : $animationsToInterpolate(addInItem)
}

export type AnimToPairs<T> = [T, T]

export interface AnimTransform {
  perspective?: AnimToPairs<number>
  rotate?: AnimToPairs<string>
  rotateX?: AnimToPairs<string>
  rotateY?: AnimToPairs<string>
  rotateZ?: AnimToPairs<string>
  scale?: AnimToPairs<number>
  scaleX?: AnimToPairs<number>
  scaleY?: AnimToPairs<number>
  translateX?: AnimToPairs<number>
  translateY?: AnimToPairs<number>
  skewX?: AnimToPairs<string>
  skewY?: AnimToPairs<string>
  time?: string,
}

export interface AnimationConfig {
  $easing?: string
  $duration?: number
  $delay?: number
  $opened?: boolean
}

interface AnimRuleSet {
  transform?: AnimTransform
  [fieldName: string]: [number, number] | [number, number, string] | [string, string] | [string, string, string] | AnimTransform
}

export type AnimSheet = { [rulesetName: string]: AnimRuleSet | number | string | boolean } & AnimationConfig
export type AnimSheets = { [sheetName: string]: AnimSheet }

export const getGaps = (interval: string, $duration: number) => {
  let leftGap = 0, rightGap = 0
  if (interval) {
    const mores = interval.trim().split('-')
    const error = `Expected -<number> | <number>- | <number>-<number> (where number can end with '%' and is in <0..100> interval), but "${interval}" found`
    warning(mores.length == 2, error)
    const ints = mores.map(m => m ? parseFloat(m) / 100 * $duration : 0)
    if (ints[0] === 0) { rightGap = $duration - ints[1] }
    else if (ints[1] === 0) leftGap = ints[0]
    else { leftGap = ints[0]; rightGap = $duration - ints[1] }
    warning(rightGap >= 0 && leftGap >= 0 && rightGap + leftGap < $duration, error)
  }
  const duration = $duration - rightGap - leftGap
  return { leftGap, rightGap, duration }
}



const $animations: AnimSheets = {
  anim: {
    rootAnim: {
      opacity: [0.2, 1, '-35'] // means 0%-35% of $duration
    },
    labelAnim: {
      transform: {
        scale: [1, 0],
        rotate: ['0deg', '180deg'],
        time: '35-' // means 35%-100% of $duration
      },
    },
    $duration: 2000,
    $easing: '',
    $delay: 500,
    $opened: true,
  },
}

