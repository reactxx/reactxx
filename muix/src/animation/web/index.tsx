import { AnimationLow } from '../common/index'
import { sheetToClassSheet } from 'muix-styles/web'
export { getAnimations } from '../common/index'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationLow<T> implements Animation.AnimationWeb<T> {
  constructor(sheet: Animation.AnimationX<T>, public statefullComponent: React.Component) {
    super(sheet, statefullComponent)
    const { $delay, $duration, $easing, $opened, ...rest } = sheet as Animation.AnimationX<{}>
    const config = {
      transitionDuration: `${$duration || 1000}ms`,
      transitionTimingFunction: $easing || 'ease-in',
      transitionDelay: `${$delay || 0}ms`,
    }
    //const rulesets0 = { ...config }, rulesets1 = { ...config}
    this.bothClassName = [{} as any, {} as any]
    for (const propsName in rest) {
      if (propsName.startsWith('$')) continue
      const pairs: Animation.RuleSetX<ReactN.TextProperties> = rest[propsName]
      const transformPairs = pairs.transform
      const ruleset0: Muix.CSSPropertiesWeb = { }, ruleset1: Muix.CSSPropertiesWeb = { }
      animatedRuleset(pairs, ruleset0, ruleset1, false, transformPairs)
      if (transformPairs) {
        let transform0 = '', transform1 = ''
        if (typeof transformPairs[0] === 'string') { //inherits from $web, values are string already
          transform0 = transformPairs[0] as string
          transform1 = transformPairs[1] as string
        } else { //convert transform object to string
          transformPairs.forEach(pair => {
            const r0 = {}; const r1 = {};
            animatedRuleset(pair, r0, r1, true)
            transform0 += r0['value'] + ' '
            transform1 += r1['value'] + ' '
          })
        }
        ruleset0['transform'] = transform0
        ruleset1['transform'] = transform1
      }
      const transitionProperty = Object.keys(ruleset0).join(', ')
      this.bothClassName[0][propsName] = { ...ruleset0, ...config, transitionProperty }
      this.bothClassName[1][propsName] = { ...ruleset1, ...config, transitionProperty }
    }
    //const x = JSON.stringify(this.bothClassName, null, 2)
    //debugger
    this.sheet = this.bothClassName[$opened ? 1 : 0]
  }
  sheet: Animation.SheetWeb<T>
  private bothClassName: Animation.SheetWeb<T>[]
  doOpen(opened: boolean) {
    this.sheet = this.bothClassName[opened ? 1 : 0]
    this.statefullComponent.forceUpdate()
  }
}

const animatedRuleset = (ruleset, r0, r1, inTransform: boolean, ignoredProp?) => {
  for (const propName in ruleset) {
    if (propName.startsWith('$')) continue
    const pair: Animation.Pair = ruleset[propName]
    if (pair === ignoredProp) continue
    if (inTransform) {
      const px = pixTransforms[propName] ? 'px' : ''
      r0.value = `${propName}(${pair[0]}${px})`
      r1.value = `${propName}(${pair[1]}${px})`
    } else {
      r0[propName] = pair[0]
      r1[propName] = pair[1]
    }
  }
}
const pixTransforms = { translateX: true, translateY: true}

