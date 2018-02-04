import { AnimationDriver } from 'muix-animation' //NATIVE (npm config) or WEB (jspm config) driver
import warning from 'warning'

export const getAnimations = <T extends Animation.AnimationsShape>(sheet: Animation.AnimationsX<T>, statefullComponent: React.Component) => {
  const drivers: Animation.Animations<T> = {} as any
  if (!sheet) return null
  for (const p in sheet) {
    if (p.startsWith('$')) continue
    drivers[p] = new AnimationDriver(sheet[p], drivers) as Animation.Animation<Animation.AnimationShape> as any
  }
  drivers.reset = (caller?: Animation.Animation<{}>) => {
    for (const p in drivers) {
      const driver = drivers[p]
      if (driver === caller || !driver.reset) continue
      driver.reset()
    }
  }
  drivers.statefullComponent = statefullComponent
  return drivers
}

//export const resetAnimations = (anims) => { for (const p in anims) anims[p].reset() }

export abstract class AnimationLow<T extends Animation.AnimationShape> implements Animation.Animation<T> {
  constructor(sheet: Animation.AnimationX<T>, public animations: Animation.Animations<{}>) {
    this.opened = !!sheet.$opened
    const { $delay = 0, $duration = 0, $easing = 'ease-in', $opened} = sheet
    this.$config = { $delay, $duration, $easing, $opened }
  }
  $config: Animation.AnimationConfig
  opened = false
  set(isOpen: boolean) {
    //if (isOpen === this.opened) return
    //this.opened = isOpen
    //if (isOpen) this.open(); else this.close()
    this.animations.reset(this)
    this.doOpen(isOpen)
  }
  toggle() { this.set(!this.opened) }
  open() { this.set(true) }
  close() { this.set(false) }
  sheet: Animation.Sheet<T>
  reset() { }
  abstract doOpen(toOpened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
  //reset() { this.opened = this.sheet.$opened }
}

export const getGaps = (modifier: string, $duration: number) => {
  let leftGap = 0, rightGap = 0
  if (modifier) {
    const mores = modifier.trim().split('-')
    const error = `-<number> | <number>- | <number>-<number> (where number is in <0..100> interval and first number must be less then the second) expected but "${modifier}" found`
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