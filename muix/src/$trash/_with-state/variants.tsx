import { TComponents, TSheeter } from 'reactxx-typings'

declare module 'reactxx-typings' {
  namespace TVariants {

    type getInnerState<R extends TSheeter.Shape = TSheeter.Shape> =
      keyof R['innerState'] extends never ? TSheeter.FakeInterface : R['innerState']

    interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
      innerState?: getInnerState<R>
    }

    interface ShapePart {
      innerState: TSheeter.EmptyInterface // inner component state
    }

    interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
      setInnerState?: SetInnerState<R> // modify innerStatePipe.pipeState.innerState and call InnerStateComponent.setState
    }

    type SetInnerState<R extends TSheeter.Shape = TSheeter.Shape> =
      (setInnerState: (prevInnerState: getInnerState<R>, props: TComponents.PropsCode<R>) => getInnerState<R>) => void

  }


}
