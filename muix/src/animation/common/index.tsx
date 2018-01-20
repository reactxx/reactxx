import { AnimationDriver } from 'muix-animation'

export class Animations<T extends Animation.AnimationsShape> implements Animation.Animations<T> {
  constructor(sheet: Animation.AnimationsX<T>, public statefullComponent: React.Component) {
    this.drivers = {} as any
    if (!sheet) return
    for (const p in sheet) {
      if (p.startsWith('$')) continue
      this.drivers[p] = new AnimationDriver(sheet[p], this)
    }
  }
  drivers: {[P in keyof T]: Animation.Animation<T[P]>}
}

export abstract class AnimationLow<T extends Animation.AnimationShape> implements Animation.Animation<T> {
  constructor(sheet: Animation.AnimationX<T>, owner: Animations<{}>) {
    this.opened = sheet.$opened ? 1 : 0
  }
  opened: 0 | 1 = 0
  set(isOpen: boolean) {
    if (!!isOpen === !!this.opened) return
    this.opened = isOpen ? 1 : 0
    if (isOpen) this.open(); else this.close()
    this.doOpen(isOpen)
  }
  toggle() { this.set(!this.opened) }
  open() { this.set(true) }
  close() { this.set(false) }
  className: Animation.Sheet<T>
  abstract doOpen(opened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
}