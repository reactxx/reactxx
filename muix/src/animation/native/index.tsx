import { AnimationDriverLow, Animations } from '../common/index'
export { Animations } from '../common/index'

export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationDriverLow<T> implements Animation.AnimationNative<T> {
  constructor(sheet: Animation.AnimationsX<T>, owner: Animations<{}>) {
    super(sheet, owner)
  }
  value: ReactN.Animated.Value
  className: {[P in keyof T]: T[P]}
  doOpen(opened: boolean) { }
}

