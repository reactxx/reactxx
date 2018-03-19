import { DriverLow, getGaps } from '../common/animation'
import warning from 'warning'
import { sheetToClassSheet, keyFrameToClassNames } from './fela'
import { Animation } from 'reactxx-typings' 
import ReactN from 'react-native'

export class Driver<T extends Animation.Shape> extends DriverLow<T> implements Animation.DriverWeb<T>  {

  constructor(sheet: Animation.SheetX<T>, public animations: Animation.Drivers<{}>) {
    super(sheet, animations)
    const { $delay, $duration, $easing, $opened } = this.$config

    const animConfig = {
      transitionTimingFunction: $easing
    }

    this.bothClassName = [{} as any, {} as any]
    for (const propsName in sheet) {
      if (propsName.startsWith('$')) continue
      const pairs: Animation.RuleSetX<ReactN.TextProperties> = sheet[propsName]
      const transformPairs = pairs.transform

      const rulesets: ReactXX.RulesetWeb[] = [{}, {}], transforms = ['', ''], range = [0, 1], transitions0 = [], transitions1 = []

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
  runningTimer: number
  private bothClassName: Animation.SheetWeb<T>[]
  reset() {
    if (!this.runningTimer) return
    clearTimeout(this.runningTimer)
    delete this.runningTimer
    this.sheet = this.bothClassName[this.opened ? 1 : 0]
  }
  doOpen(opened: boolean) {
    const { $delay, $duration } = this.$config
    if (this.runningTimer) clearTimeout(this.runningTimer)
    this.opened = opened
    this.runningTimer = window.setTimeout(() => {
      delete this.runningTimer
      //this.animations.statefullComponent.forceUpdate()
    }, $delay + $duration)
    this.sheet = this.bothClassName[opened ? 1 : 0]
    this.animations.statefullComponent.forceUpdate()
    //this.animations.statefullComponent.setState(st => ({ x: new Date().getTime() }))
  }
}

const pixTransforms = { translateX: true, translateY: true }

