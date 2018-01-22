import { AnimationLow, getAnimations, getGaps } from '../common/index'
export { getAnimations } from '../common/index'
import warning from 'warning'
import { sheetToClassSheet, keyFrameToClassNames } from 'muix-styles/web'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationLow<T> implements Animation.AnimationWeb<T> {
  constructor(sheet: Animation.AnimationX<T>, public statefullComponent: React.Component) {
    super(sheet, statefullComponent)
    const { $delay = 0, $duration = 0, $easing = 'ease-in', $opened, ...rest } = sheet as Animation.AnimationX<{}>
    const config = {
      transitionTimingFunction: $easing
    }

    this.bothClassName = [{} as any, {} as any]
    for (const propsName in rest) {
      if (propsName.startsWith('$')) continue
      const pairs: Animation.RuleSetX<ReactN.TextProperties> = rest[propsName]
      const transformPairs = pairs.transform

      const rulesets: Muix.CSSPropertiesWeb[] = [{}, {}], transforms = ['', ''], range = [0, 1], transitions0 = [], transitions1 = []

      const addTransformString = (pair, modifier: string) => {
        range.forEach(idx => rulesets[idx]['transform'] = pair[idx])
        setTransition('transform', modifier)
      }
      const addTransformProp = (pair, propName: string) => {
        const px = pixTransforms[propName] ? 'px' : ''
        range.forEach(idx => transforms[idx] += ` ${propName}(${pair[idx]}${px})`)
      }
      const addProp = (pair, propName: string, modifier: string) => {
        range.forEach(idx => rulesets[idx][propName] = pair[idx])
        setTransition(propName, modifier)
      }
      const setTransition = (propName: string, modifier: string) => {
        let { leftGap, rightGap, duration} = getGaps(modifier, $duration)
        leftGap += $delay; rightGap += $delay
        transitions0.push(`${propName} ${duration}ms${rightGap ? ' ' + rightGap + 'ms' : ''}`)
        transitions1.push(`${propName} ${duration}ms${leftGap ? ' ' + leftGap + 'ms' : ''}`)
      }

      for (const propName in pairs) {
        if (propName.startsWith('$')) continue
        const pair = pairs[propName]
        if (pair === transformPairs) {
          if (typeof transformPairs[0] === 'string') //e.g. transform: ['translateX(-200px) scale(0)', 'translateX(0px) scale(1)']
            addTransformString(transformPairs, null)
          else { //e.g. transform: [ { translateX: [-200, 0] }, { scale: [0, 1] }, '30-50']
            let modifier = null
            transformPairs.forEach(pairs2 => {
              if (typeof pairs2 === 'string')
                modifier = pairs2
              else for (const propName2 in pairs2)
                addTransformProp(pairs2[propName2], propName2)
            })
            addTransformString(transforms, modifier)
          }
        } else //e.g. opacity: [0,1]
          addProp(pair, propName, pair[2])
      }
      this.bothClassName[0][propsName] = { ...rulesets[0], transitionTimingFunction: $easing, transition: transitions0.join(', ') }
      this.bothClassName[1][propsName] = { ...rulesets[1], transitionTimingFunction: $easing, transition: transitions1.join(', ') }
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

const getKeyFrameObject = (frames: [number, string, any][]) => {
  if (frames.length == 0) return null
  frames = frames.sort((a, b) => a[0] - b[0])
  const res0 = {}, res1 = {}
  let lastRule, lastIdx = -1
  frames.forEach(rule => {
    const frame = rule[0]
    if (frame < 0 || frame > 1 || rule[0] < lastIdx) return //error
    if (frame > lastIdx) {
      res1[`${frame * 100}%`] = lastRule = {}
      res0[`${(1 - frame) * 100}%`] = lastRule
    }
    lastIdx = frame
    if (lastRule['transform'] && rule[1] == 'transform') lastRule['transform'] += ', ' + rule[2]
    else lastRule[rule[1]] = rule[2]
  })
  return [res0, res1]
}

const pixTransforms = { translateX: true, translateY: true }

