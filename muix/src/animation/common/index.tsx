import { AnimationDriver } from 'muix-animation' //NATIVE (npm config) or WEB (jspm config) driver

export const getAnimations = <T extends Animation.AnimationsShape>(sheet: Animation.AnimationsX<T>, statefullComponent: React.Component) => {
  const drivers: {[P in keyof T]: Animation.Animation<T[P]>} = {} as any
  if (!sheet) return null
  for (const p in sheet) {
    if (p.startsWith('$')) continue
    drivers[p] = new AnimationDriver(sheet[p], statefullComponent)
  }
  return drivers
}

export abstract class AnimationLow<T extends Animation.AnimationShape> implements Animation.Animation<T> {
  constructor(sheet: Animation.AnimationX<T>, statefullComponent: React.Component) {
    this.opened = sheet.$opened
  }
  opened = false
  set(isOpen: boolean) {
    if (isOpen === this.opened) return
    this.opened = isOpen
    if (isOpen) this.open(); else this.close()
    this.doOpen(isOpen)
  }
  toggle() { this.set(!this.opened) }
  open() { this.set(true) }
  close() { this.set(false) }
  sheet: Animation.Sheet<T>
  abstract doOpen(toOpened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
}