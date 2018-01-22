import { Animated } from 'react-native'
import { AnimationLow, getGaps, getAnimations } from '../common/index'
export { getAnimations } from '../common/index'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationLow<T> implements Animation.AnimationNative<T> {
  constructor(sheet: Animation.AnimationX<T>, statefullComponent: React.Component) {
    super(sheet, statefullComponent)
    this.value = new Animated.Value(this.opened ? 1 : 0)
    const rulesets = this.sheet = {} as any
    const { $delay = 0, $duration = 0, $easing = 'ease-in', $opened, ...rest } = sheet as Animation.AnimationX<{}>

    let useNativeDriver = true

    //const addPropDebug = (pair, modifier: string) => {
    //  let { leftGap, rightGap } = getGaps(modifier, $duration)
    //  console.log(pair, modifier, leftGap, rightGap, $duration)
    //  if (!leftGap && !rightGap) return { inputRange: [0, 1], outputRange: pair }
    //  else {
    //    leftGap = leftGap / $duration; rightGap = rightGap / $duration
    //    if (leftGap && rightGap) return { inputRange: [0, leftGap, 1 - rightGap, 1], outputRange: [pair[0], pair[0], pair[1], pair[1]] }
    //    else if (leftGap) return { inputRange: [0, leftGap, 1], outputRange: [pair[0], pair[0], pair[1]] }
    //    else return { inputRange: [0, 1 - rightGap, 1], outputRange: [pair[0], pair[1], pair[1]] }
    //  }
    //}

    const addProp = (pair, modifier: string) => {
      let { leftGap, rightGap } = getGaps(modifier, $duration)
      //console.log(pair, modifier, leftGap, rightGap, $duration)
      if (!leftGap && !rightGap) return this.value.interpolate({ inputRange: [0, 1], outputRange: pair })
      else {
        leftGap = leftGap / $duration; rightGap = rightGap / $duration
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
            for (const propName3 in pairs2) {
              useNativeDriver = useNativeDriver && allowedTransforms[propName3]
              item[propName3] = addProp(pairs2[propName3], modifier)
            }
          })
        } else {
          useNativeDriver = useNativeDriver && allowedStyles[propName2]
          ruleset[propName2] = addProp(pair, pair[2])
        }
      }
    }

    //console.log(rulesets)
    this.config = { delay: $delay, duration: $duration, toValue: null, useNativeDriver }
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

//Allowed native driver props, see https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js
const allowedStyles = { opacity: true, transform: true }
const allowedTransforms = { translateX: true, translateY: true, scale: true, scaleX: true, scaleY: true, rotate: true, rotateX: true, rotateY: true, perspective: true, }