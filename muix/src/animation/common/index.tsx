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
  open() {
    if (this.opened) return
    this.opened = 1
    this.doOpen(true)
  }
  close() {
    if (!this.opened) return
    this.opened = 0
    this.doOpen(false)
  }
  className: Animation.Sheet<T>
  abstract doOpen(opened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
}