import React from 'react'
import ReactN from 'react-native'

import { AnimationDriver } from 'reactxx' //NATIVE or WEB animation driver
import { Animation } from 'reactxx-typings' 
import warning from 'warning'

export const getAnimations = <T extends Animation.Shapes>(sheets: Animation.SheetsX<T>, statefullComponent: React.Component) => {
  if (!sheets) return null
  const drivers: Animation.Drivers<T> = {} as any
  for (const p in sheets) {
    if (p.startsWith('$')) continue
    drivers[p] = new AnimationDriver(sheets[p], drivers) as any
  }
  drivers.reset = (caller?: Animation.Driver<{}>) => {
    for (const p in drivers) {
      const driver = drivers[p]
      if (driver === caller || !driver.reset) continue
      driver.reset()
    }
  }
  drivers.statefullComponent = statefullComponent
  return drivers
}

export abstract class DriverLow<T extends Animation.Shape> implements Animation.Driver<T> {
  constructor(sheet: Animation.SheetX<T>, public animations: Animation.Drivers<{}>) {
    this.opened = !!sheet.$opened
    const { $delay = 0, $duration = 0, $easing = 'ease-in', $opened} = sheet
    this.$config = { $delay, $duration, $easing, $opened }
  }
  $config: Animation.AnimationConfig
  opened = false
  set(isOpen: boolean) {
    this.animations.reset(this)
    this.doOpen(isOpen)
  }
  toggle() { this.set(!this.opened) }
  open() { this.set(true) }
  close() { this.set(false) }
  sheet: Animation.Sheet<T>
  reset() { }
  abstract doOpen(toOpened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
}

export const getGaps = (modifier: string, $duration: number) => {
  let leftGap = 0, rightGap = 0
  if (modifier) {
    const mores = modifier.trim().split('-')
    const error = `Expected -<number> | <number>- | <number>-<number> (where number can end with '%' and is in <0..100> interval), but "${modifier}" found`
    warning(mores.length == 2, error)
    const ints = mores.map(m => m ? parseFloat(m.replace('%','')) / 100 * $duration : 0)
    if (ints[0] === 0) { rightGap = $duration - ints[1] }
    else if (ints[1] === 0) leftGap = ints[0]
    else { leftGap = ints[0]; rightGap = $duration - ints[1] }
    warning(rightGap >= 0 && leftGap >= 0 && rightGap + leftGap < $duration, error)
  }
  const duration = $duration - rightGap - leftGap
  return { leftGap, rightGap, duration}
}