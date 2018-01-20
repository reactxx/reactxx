import { AnimationDriver } from 'muix-animation'

export class Animations<T extends Animation.AnimationsShape> implements Animation.Animations<T> {
  constructor(sheet: Animation.AnimationsSheetX<T>, public statefullComponent: React.Component) {
    this.drivers = {} as any
    if (!sheet) return
    for (const p in sheet) this.drivers[p] = new AnimationDriver(sheet[p], this)
  }
  drivers: {[P in keyof T]: Animation.Animation<T[P]>}
}

export abstract class AnimationDriverLow<T extends Animation.AnimationShape> implements Animation.Animation<T> {
  constructor(sheet: Animation.AnimationsX<T>, owner: Animations<{}>) {
    this.opened = sheet.$opened ? 1 : 0
  }
  opened: 0 | 1 = 0
  open() {
    if (this.opened) return
    this.opened = 1
    this.className = this.bothClassName[this.opened]
    this.doOpen(true)
  }
  close() {
    if (!this.opened) return
    this.opened = 0
    this.className = this.bothClassName[this.opened]
    this.doOpen(false)
  }
  className: {[P in keyof T]: (T[P] | string) }
  abstract doOpen(opened: boolean) //platform specific action: forceUpdate for web, Animated.value.setValue for native
  protected bothClassName: {[P in keyof T]: (T[P] | string) }[]
}