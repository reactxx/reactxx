import warning from 'warning';
import { Consts, FinishAddIn, Sheets } from 'reactxx-sheeter';
import { $animationsToInterpolate, NativeAnimationAddIn } from './native';
import { $animationsToCSS, WebAnimationAddIn } from './web';

export {NativeAnimationAddIn, NativeAnimationRuleset, InterpolationConfigTypes } from './native';
export {WebAnimationAddIn, WebAnimationRuleset } from './web';
export const animationFinishAddInClasses: FinishAddIn = (addInItem: Sheets) => {
  return window.isWeb ? $animationsToCSS(addInItem) : $animationsToInterpolate(addInItem)
}

export type AnimationAddIn = WebAnimationAddIn | NativeAnimationAddIn
export type AnimationAddIns = { [animName: string]: AnimationAddIn }

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
  useNativeDriver?:boolean
  rulesetNames?:string[]
}

export interface SheetExtension extends AnimationConfig {
  [Consts.data]: AnimationConfig & { useNativeDriver?: boolean }
}

type AnimRuleseLow = { [fieldName: string]: [number, number] | [number, number, string] | [string, string] | [string, string, string] }

export type AnimRuleset = AnimRuleseLow & { transform?: AnimTransform }

export type AnimSheet = { [rulesetName: string]: AnimRuleset } & AnimationConfig
//export type AnimSheets = { [sheetName: string]: AnimSheet }

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