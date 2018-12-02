import React from 'react';
import warning from 'warning';
import * as Sheeter from 'reactxx-styler';
import { AnimationDriver } from 'reactxx-animation';

/************************
* EXPORTED
*************************/

export const animations = (input: () => Sheeter.AnimationAddIns, output: (outputPar: AnimationsComponent) => void, next: () => React.ReactNode) => {
  const render = (animations: AnimationsComponent) => {
    output(animations)
    return next()
  }
  const res = () => {
    const addIns = input()
    if (addIns) return <AnimationsComponent addIns={addIns}>{render}</AnimationsComponent>
    output(null)
    return next()
  }
  return res
}

/************************
* INTERNAL
*************************/

export abstract class DriverLow {
  constructor(sheet: Sheeter.AnimationAddIn, name: string, component: AnimationsComponent) {
    //this.$config = sheet[Sheeter.Consts.data]
    //this.opened = !!this.$config.$opened
    this.$config = sheet[Sheeter.Consts.data]
    this.$pars = {
      component, name, sheet, opened: !!this.$config.$opened, rulesetNames: this.$config.rulesetNames
    }
  }

  $config: Sheeter.AnimationConfig
  $pars: {
    opened: boolean,
    rulesetNames: string[],
    sheet: Sheeter.AnimationAddIn,
    name: string,
    component: AnimationsComponent
  }

  set(isOpen: boolean) {
    this.$pars.component.reset(this)
    this.doOpen(isOpen)
  }
  toggle() { this.set(!this.$pars.opened) }
  open() { this.set(true) }
  close() { this.set(false) }
  reset() { }
  abstract doOpen(toOpened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
}

/************************
* PRIVATE
*************************/

interface AnimState {
  [animName: string]: boolean
}

interface AnimProps {
  addIns: Sheeter.AnimationAddIns
  children: (animations: AnimationsComponent) => React.ReactNode
}

const wrongAnimNames = {
  context: true,
  isMounted: true,
  props: true,
  refs: true,
  replaceState: true,
  reset: true,
  state: true,
  $pars: true,
}

class AnimationsComponent extends React.Component<AnimProps> {

  constructor(props: AnimProps) {
    super(props)
    this.adjustDrivers()
  }

  private $pars = {
    animNames: Object.keys(this.props.addIns).filter(p => p.charAt(0) != '#'),
    lastAddIns: null as Sheeter.AnimationAddIns
  }

  private adjustDrivers() {
    const { $pars: { animNames, lastAddIns }, props: { addIns } } = this
    if (addIns === lastAddIns) return
    this.$pars.lastAddIns = addIns
    this.$pars.animNames.forEach(animName => {
      const sheet = addIns[animName]
      warning (!wrongAnimNames[animName], 'Wrong animation name: ${animName}')
      this[animName] = new AnimationDriver(sheet, animName, this)
    })
  }

  render() {
    this.adjustDrivers()
    return this.props.children(this)
  }

  reset = (justRunning?: DriverLow) => {
    this.$pars.animNames.forEach(animName => {
      const driver = this[animName] as DriverLow
      if (driver !== justRunning) driver.reset()
    })
  }

}

