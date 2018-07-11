import React from 'react';
import * as Sheeter from 'reactxx-sheeter';

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
  constructor(public sheet: Sheeter.AnimationAddIn, public name: string, public component: AnimationsComponent) {
    this.$config = sheet[Sheeter.Consts.data]
    this.opened = !!this.$config.$opened
  }

  $config: Sheeter.AnimationConfig
  opened: boolean
  rulesetNames = Object.keys(this.sheet).filter(name => name.charAt(0)!='#')

  set(isOpen: boolean) {
    this.component.reset(this)
    this.doOpen(isOpen)
  }
  toggle() { this.set(!this.opened) }
  open() { this.set(true) }
  close() { this.set(false) }
  reset() { }
  abstract doOpen(toOpened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
}

class Driver extends DriverLow {
  doOpen(toOpened: boolean) { }
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

class AnimationsComponent extends React.Component<AnimProps> {

  constructor(props: AnimProps) {
    super(props)
    this.adjustDrivers()
  }

  private animNames = Object.keys(this.props.addIns).filter(p => p.charAt(0) != '#')
  private lastAddIns: Sheeter.AnimationAddIns

  private adjustDrivers() {
    const { animNames, lastAddIns, props: { addIns } } = this
    if (addIns === lastAddIns) return
    this.lastAddIns = addIns
    this.animNames.forEach(animName => {
      const sheet = addIns[animName]
      this[animName] = new Driver(sheet, animName, this)
    })
  }

  render() {
    this.adjustDrivers()
    return this.props.children(this)
  }

  reset = (justRunning?: DriverLow) => {
    this.animNames.forEach(animName => {
      const driver = this[animName] as DriverLow
      if (driver !== justRunning) driver.reset()
    })
  }

}

