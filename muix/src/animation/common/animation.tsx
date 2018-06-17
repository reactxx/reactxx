import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { AnimationDriver } from 'reactxx-animation' //NATIVE or WEB animation driver 
import { TAnimation } from '../typings/animation'

/************************
* EXPORTED
*************************/

export const animations = (input: () => TAnimation.SheetsX, output: (outputPar: TAnimation.Drivers) => void, next: () => React.ReactNode) => {
  const render = (animations: TAnimation.Drivers) => {
    console.log('animations.render')
    output(animations)
    return next()
  }
  const res = () => {
    const $animations = input()
    if ($animations) return <AnimationsComponent $initAnimations={$animations}>{render}</AnimationsComponent>
    output(null)
    return next()
  }
  return res
}

/************************
* INTERNAL
*************************/

export abstract class DriverLow<T extends TAnimation.Shape> implements TAnimation.Driver<T> {
  constructor(sheet: TAnimation.SheetX<T>, public animations: TAnimation.Drivers) {
    this.opened = !!sheet.$opened
    const { $delay = 0, $duration = 0, $easing = 'ease-in', $opened } = sheet
    this.$config = { $delay, $duration, $easing, $opened }
  }
  $config: TAnimation.AnimationConfig
  opened = false
  set(isOpen: boolean) {
    this.animations.reset(this)
    this.doOpen(isOpen)
  }
  toggle() { this.set(!this.opened) }
  open() { this.set(true) }
  close() { this.set(false) }
  sheet: TAnimation.Sheet<T>
  reset() { }
  abstract doOpen(toOpened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
}

export const getGaps = (modifier: string, $duration: number) => {
  let leftGap = 0, rightGap = 0
  if (modifier) {
    const mores = modifier.trim().split('-')
    const error = `Expected -<number> | <number>- | <number>-<number> (where number can end with '%' and is in <0..100> interval), but "${modifier}" found`
    warning(mores.length == 2, error)
    const ints = mores.map(m => m ? parseFloat(m.replace('%', '')) / 100 * $duration : 0)
    if (ints[0] === 0) { rightGap = $duration - ints[1] }
    else if (ints[1] === 0) leftGap = ints[0]
    else { leftGap = ints[0]; rightGap = $duration - ints[1] }
    warning(rightGap >= 0 && leftGap >= 0 && rightGap + leftGap < $duration, error)
  }
  const duration = $duration - rightGap - leftGap
  return { leftGap, rightGap, duration }
}


/************************
* PRIVATE
*************************/

interface AnimState {
  sheets?: { [name: string]: TAnimation.Driver }
  self: AnimationsComponent
}
interface AnimProps {
  $initAnimations: TAnimation.SheetsX
  children: (animations: TAnimation.Drivers) => React.ReactNode
}

class AnimationsComponent extends React.Component<AnimProps, AnimState> {

  constructor (props) {
    super(props)
    console.log('AnimationsComponent.create')
  }

  state: AnimState = { self: this }

  static getDerivedStateFromProps(nextProps: AnimProps, prevState: AnimState): Partial<AnimState> {
    if (!nextProps.$initAnimations) return { sheets: null }
    const $anim = nextProps.$initAnimations
    const sheets:{ [name: string]: TAnimation.Driver } = {}
    const self = prevState.self
    for (const p in $anim) {
      if (p.startsWith('$')) continue
      const parent: TAnimation.Drivers = { statefullComponent: self, reset: self.reset, sheets: self.state.sheets }
      sheets[p] = new AnimationDriver($anim[p], parent)
    }
    return { sheets }
  }

  render() {
    console.log('AnimationsComponent.render')
    return this.props.children({ statefullComponent: this, reset: this.reset, sheets: this.state.sheets })
  }

  reset = (justRunning?: TAnimation.Driver<{}>) => {
    const anim = this.state.sheets
    for (const p in anim) {
      const driver = anim[p]
      if (!driver.reset || driver === justRunning) continue
      driver.reset()
    }
  }

}

