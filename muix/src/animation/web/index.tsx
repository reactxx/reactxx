import { AnimationLow, Animations } from '../common/index'
import { sheetToClassSheet } from 'muix-styles/web'
export { Animations } from '../common/index'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationLow<T> implements Animation.AnimationWeb<T> {
  constructor(sheet: Animation.AnimationX<T>, public owner: Animations<{}>) {
    super(sheet, owner)
    const rulesets0 = {}, rulesets1 = {}
    this.bothClassName = [{} as any, {} as any]
    const { $delay, $duration, $easing, $opened, ...rest } = sheet as Animation.AnimationX<{}>
    for (const propsName in rest) {
      if (propsName.startsWith('$')) continue
      const pairs: Animation.RuleSetX<ReactN.TextProperties> = rest[propsName]
      const transformPairs = pairs.transform
      const ruleset0: Muix.CSSPropertiesWeb = {}, ruleset1: Muix.CSSPropertiesWeb = {}
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
      this.bothClassName[0][propsName] = rulesets0
      this.bothClassName[1][propsName] = rulesets1
    }
    this.className = this.bothClassName[$opened ? 1 : 0]
  }
  className: Animation.SheetWeb<T>
  private bothClassName: Animation.SheetWeb<T>[]
  doOpen(opened: boolean) {
    this.className = this.bothClassName[opened ? 1 : 0]
    this.owner.statefullComponent.forceUpdate()
  }
}

const animatedRuleset = (ruleset, r0, r1, inTransform: boolean, ignoredProp?) => {
  for (const propName in ruleset) {
    if (propName.startsWith('$')) continue
    const pair: Animation.Pair = ruleset[propName]
    if (pair === ignoredProp) continue
    if (inTransform) {
      r0.value = `${propName}(${pair[0]})`
      r1.value = `${propName}(${pair[1]})`
    } else {
      r0[propName] = pair[0]
      r1[propName] = pair[1]
    }
  }
}

