import warning from 'warning'
import { Consts, Sheets, Sheet, getGaps } from '../index'

export const $animationsToInterpolate = ($animations: Sheets) => {
  for (const sheetName in $animations) {
    const sheet = $animations[sheetName]
    const { $delay = 0, $duration = 0, $easing = 'ease-in', $opened } = sheet
    $animations[sheetName] = sheetToInterpolate(sheet, $duration as number, $delay as number, $easing as string)
  }
}

const sheetToInterpolate = (inputSheet: Sheet, $duration: number, $delay: number, $easing: string) => {
  const outputSheet = { } as any

  let useNativeDriver = true

  const addProp = (pair, modifier: string) => {
    let { leftGap, rightGap } = getGaps(modifier, $duration)
    //console.log(pair, modifier, leftGap, rightGap, $duration)
    if (!leftGap && !rightGap) return { inputRange: [0, 1], outputRange: pair }
    else {
      leftGap = leftGap / $duration; rightGap = rightGap / $duration
      if (leftGap && rightGap) return { inputRange: [0, leftGap, 1 - rightGap, 1], outputRange: [pair[0], pair[0], pair[1], pair[1]] }
      else if (leftGap) return { inputRange: [0, leftGap, 1], outputRange: [pair[0], pair[0], pair[1]] }
      else return { inputRange: [0, 1 - rightGap, 1], outputRange: [pair[0], pair[1], pair[1]] }
    }
  }

  for (const rulesetName in inputSheet) {
    if (rulesetName.startsWith('$')) continue
    const ruleset = inputSheet[rulesetName]
    const transformRule = ruleset.transform
    const outputRuleset = outputSheet[rulesetName] = {}
    for (const ruleName in ruleset) {
      if (ruleName.startsWith('$')) continue
      const rule = ruleset[ruleName]
      if (rule === transformRule) {
        const modifier = transformRule.time
        const outputTransform = outputRuleset['transform'] = []
        for (const transformName in transformRule) {
          const transform = transformRule[transformName]
          if (typeof transform === 'string') continue
          const item = {}; outputTransform.push(item)
          useNativeDriver = useNativeDriver && allowedTransforms[transformName]
          item[transformName] = addProp(transform, modifier)
        }
      } else {
        useNativeDriver = useNativeDriver && allowedStyles[ruleName]
        outputRuleset[ruleName] = addProp(rule, rule[2])
      }
    }
  }
  outputSheet[Consts.data] = {
    TimingAnimationConfig: { duration: $duration, delay: $delay, $easing, useNativeDriver }
  }
  return outputSheet
}

//Allowed native driver props, see https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js
const allowedStyles = { opacity: true, transform: true }
const allowedTransforms = { translateX: true, translateY: true, scale: true, scaleX: true, scaleY: true, rotate: true, rotateX: true, rotateY: true, perspective: true, }