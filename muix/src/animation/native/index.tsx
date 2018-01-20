import { Animated } from 'react-native'
import { AnimationLow, Animations } from '../common/index'
export { Animations } from '../common/index'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationLow<T> implements Animation.AnimationNative<T> {
  constructor(sheet: Animation.AnimationX<T>, owner: Animations<{}>) {
    super(sheet, owner)
    this.value = new Animated.Value(this.opened ? 1 : 0)
    const rulesets = this.className = {} as any
    const { $delay, $duration, $easing, $opened, ...rest } = sheet as Animation.AnimationX<{}>
    for (const propsName in rest) {
      if (propsName.startsWith('$')) continue
      const pairs: Animation.RuleSetX<ReactN.TextProperties> = rest[propsName]
      const transformPairs = pairs.transform
      const ruleset = rulesets[propsName] = animatedRuleset(pairs, this.value, transformPairs)
      if (transformPairs) {
        const transform = ruleset['transform'] = []
        transformPairs.forEach(pair => transform.push(animatedRuleset(pair, this.value)))
      }
    }
    this.config = { delay: $delay, duration: $duration, toValue: null }
  }
  value: ReactN.Animated.Value
  config: Animated.TimingAnimationConfig
  className: Animation.SheetNative<T>
  protected bothClassName: {[P in keyof T]: T[P]}[]
  doOpen(opened: boolean) {
    const { value, config } = this
    value.stopAnimation()
    Animated.timing(value, { ...config, toValue: opened ? 0 : 1 }).start()
  }
}

const animatedRuleset = (ruleset, value: Animated.Value, ignoredProp?) => {
  const res = {}
  for (const propName in ruleset) {
    if (propName.startsWith('$')) continue
    const pair = ruleset[propName]
    if (pair === ignoredProp) continue
    res[propName] = value.interpolate({ inputRange: [0, 1], outputRange: pair })
  }
  return res
}

