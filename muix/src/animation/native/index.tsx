import { Animated } from 'react-native'
import { AnimationLow, getGaps, getAnimations } from '../common/index'
export { getAnimations } from '../common/index'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationLow<T> implements Animation.AnimationNative<T> {
  constructor(sheet: Animation.AnimationX<T>, statefullComponent: React.Component) {
    super(sheet, statefullComponent)
    this.value = new Animated.Value(this.opened ? 1 : 0)
    const rulesets = this.sheet = {} as any
    const { $delay = 0, $duration = 0, $easing = 'ease-in', $opened, ...rest } = sheet as Animation.AnimationX<{}>

    const addPropDebug = (pair, modifier: string) => {
      let { leftGap, rightGap } = getGaps(modifier, $duration)
      console.log(pair, modifier, leftGap, rightGap, $duration)
      if (!leftGap && !rightGap) return { inputRange: [0, 1], outputRange: pair }
      else {
        leftGap = leftGap / $duration; rightGap = rightGap / $duration
        if (leftGap && rightGap) return { inputRange: [0, leftGap, 1 - rightGap, 1], outputRange: [pair[0], pair[0], pair[1], pair[1]] }
        else if (leftGap) return { inputRange: [0, leftGap, 1], outputRange: [pair[0], pair[0], pair[1]] }
        else return { inputRange: [0, 1 - rightGap, 1], outputRange: [pair[0], pair[1], pair[1]] }
      }
    }

    const addProp = (pair, modifier: string) => {
      let { leftGap, rightGap } = getGaps(modifier, $duration)
      console.log(pair, modifier, leftGap, rightGap, $duration)
      if (!leftGap && !rightGap) return this.value.interpolate({ inputRange: [0, 1], outputRange: pair })
      else {
        leftGap = leftGap / $duration; rightGap = rightGap / $duration
        //const x = leftGap; leftGap = rightGap / $duration; rightGap = x / $duration
        if (leftGap && rightGap) return this.value.interpolate({ inputRange: [0, leftGap, 1 - rightGap, 1], outputRange: [pair[0], pair[0], pair[1], pair[1]] })
        else if (leftGap) return this.value.interpolate({ inputRange: [0, leftGap, 1], outputRange: [pair[0], pair[0], pair[1]] })
        else return this.value.interpolate({ inputRange: [0, 1 - rightGap, 1], outputRange: [pair[0], pair[1], pair[1]] })
      }
    }

    for (const propsName in rest) {
      if (propsName.startsWith('$')) continue
      const pairs: Animation.RuleSetX<ReactN.TextProperties> = rest[propsName]
      const transformPairs = pairs.transform
      const ruleset = rulesets[propsName] = {}
      for (const propName2 in pairs) {
        if (propName2.startsWith('$')) continue
        const pair = pairs[propName2]
        if (pair === transformPairs) {
          const modifier = transformPairs.find(pairs2 => typeof pairs2 === 'string') as string
          const transform = ruleset['transform'] = []
          transformPairs.forEach(pairs2 => {
            if (typeof pairs2 === 'string') return
            const item = {}; transform.push(item)
            for (const propName3 in pairs2)
              item[propName3] = addProp(pairs2[propName3], modifier)
          })
        } else
          ruleset[propName2] = addProp(pair, pair[2])
      }
    }

    console.log(rulesets)
    //for (const propsName in rest) {
    //  if (propsName.startsWith('$')) continue
    //  const pairs: Animation.RuleSetX<ReactN.TextProperties> = rest[propsName]
    //  const transformPairs = pairs.transform
    //  const ruleset = rulesets[propsName] = animatedRuleset(pairs, this.value, transformPairs)
    //  if (transformPairs) {
    //    const transform = ruleset['transform'] = []
    //    transformPairs.forEach(pair => transform.push(animatedRuleset(pair, this.value)))
    //  }
    //}
    this.config = { delay: $delay, duration: $duration, toValue: null, useNativeDriver: true }
  }
  value: ReactN.Animated.Value
  config: Animated.TimingAnimationConfig
  sheet: Animation.SheetNative<T>
  protected bothClassName: {[P in keyof T]: T[P]}[]
  doOpen(toOpened: boolean) {
    const { value, config } = this
    value.stopAnimation()
    Animated.timing(value, { ...config, toValue: toOpened ? 1 : 0 }).start()
  }
}

//const animatedRuleset = (ruleset, value: Animated.Value, ignoredProp?) => {
//  const res = {}
//  for (const propName in ruleset) {
//    if (propName.startsWith('$')) continue
//    let pair: any[] = ruleset[propName]
//    if (pair === ignoredProp) continue
//    if (pair.length == 3) {
//      const more: string = pair[2]
//      const mores: any = more.split(',').map(p => p.split('=').map((v, idx) => idx == 0 ? parseFloat(v) : v))
//      pair = pair.splice(0, 2)
//      //console.log({ inputRange: [0, ...mores[0], 1], outputRange: [pair[0], ...mores[1], pair[1]] })
//      res[propName] = value.interpolate({ inputRange: [0, ...mores[0], 1], outputRange: [pair[0], ...mores[1], pair[1]] })
//    } else
//      res[propName] = value.interpolate({ inputRange: [0, 1], outputRange: pair })
//    //res[propName] = { animated:'$animated', inputRange: [0, 1], outputRange: pair }
//  }
//  return res
//}

