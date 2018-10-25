import { TComponents, TSheeter } from 'reactxx-typings'

export type getInnerState<R extends TSheeter.Shape = TSheeter.Shape> =
  keyof R['innerState'] extends never ? TSheeter.FakeInterface : R['innerState']


declare module 'reactxx-typings' {
  namespace TVariants {
    interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
      state?: getInnerState<R>
    }

    interface ShapePart {
      innerState: TSheeter.EmptyInterface // inner component state
    }

    interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
      setInnerState?: SetInnerState<R> // modify innerStatePipe.pipeState.innerState and call InnerStateComponent.setState
    }

    type SetInnerState<R extends TSheeter.Shape = TSheeter.Shape> =
      (setState: (prevState: Query<R>, props: TComponents.PropsCode<R>) => Query<R>) => void

  }


}
