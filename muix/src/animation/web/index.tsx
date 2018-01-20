import { AnimationDriverLow, Animations } from '../common/index'
export { Animations } from '../common/index'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationDriverLow<T> implements Animation.AnimationWeb<T> {
  constructor(sheet: Animation.AnimationsX<T>, owner: Animations<{}>) {
    super(sheet, owner)
  }
  className: {[P in keyof T]: string}
  doOpen(opened: boolean) { }
}