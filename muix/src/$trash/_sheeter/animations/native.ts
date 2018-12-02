import ReactN from 'react-native'
import warning from 'warning'
import { Consts, Sheets, getGaps } from 'reactxx-sheeter'
import { AnimSheet, AnimationConfig } from '.'

export const $animationsToInterpolate = ($animations: Sheets) => {
  for (const sheetName in $animations) $animations[sheetName] = sheetToInterpolate($animations[sheetName])
}

export type NativeAnimationAddIn = { [rulesetName: string]: NativeAnimationRuleset } & { [Consts.data]?: AnimationConfig }

export type NativeAnimationRuleset = InterpolationConfigTypes & { transform?: InterpolationConfigTypes }
type InterpolationConfigType = ReactN.Animated.InterpolationConfigType
export type InterpolationConfigTypes = { [ruleName: string]: InterpolationConfigType }

const sheetToInterpolate = (inputSheet: AnimSheet) => {

  const { $duration = 0, $delay = 0, $easing, $opened, ...rulesets } = inputSheet

  const addProp = (pair, modifier: string | never) => {
    let { leftGap, rightGap } = getGaps(modifier, $duration)
    //console.log(pair, modifier, leftGap, rightGap, $duration)
    if (!leftGap && !rightGap)
      return { inputRange: [0, 1], outputRange: pair }
    else {
      leftGap = leftGap / $duration; rightGap = rightGap / $duration
      if (leftGap && rightGap) return { inputRange: [0, leftGap, 1 - rightGap, 1], outputRange: [pair[0], pair[0], pair[1], pair[1]] }
      else if (leftGap) return { inputRange: [0, leftGap, 1], outputRange: [pair[0], pair[0], pair[1]] }
      else return { inputRange: [0, 1 - rightGap, 1], outputRange: [pair[0], pair[1], pair[1]] }
    }
  }

  let useNativeDriver = true
  const outputSheet: NativeAnimationAddIn = {}
  for (const rulesetName in rulesets) {
    const ruleset = rulesets[rulesetName]
    const output: NativeAnimationRuleset = outputSheet[rulesetName] = {}
    const transformRule = ruleset.transform
    for (const ruleName in ruleset) {
      if (ruleName.startsWith('$')) continue
      const rule = ruleset[ruleName]
      if (rule === transformRule) {
        const modifier = transformRule.time
        const outputTransform: InterpolationConfigTypes = output.transform = {}
        for (const transformName in transformRule) {
          if (transformName === 'time') continue
          const transform = transformRule[transformName]
          useNativeDriver = useNativeDriver && allowedTransforms[transformName]
          outputTransform[transformName] = addProp(transform, modifier)
        }
      } else {
        useNativeDriver = useNativeDriver && allowedStyles[ruleName]
        output[ruleName] = addProp(rule, rule[2] as string)
      }
    }
  }
  outputSheet[Consts.data] = {
    $opened,
    $easing,
    $delay,
    $duration,
    useNativeDriver,
    rulesetNames: Object.keys(rulesets)
  }
  return outputSheet
}

//Allowed native driver props, see https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js
const allowedTransforms = { translateX: true, translateY: true, scale: true, scaleX: true, scaleY: true, rotate: true, rotateX: true, rotateY: true, perspective: true, }
const allowedStyles = { opacity: true, transform: true }
