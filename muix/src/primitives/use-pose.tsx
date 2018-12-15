import { TTyped, TComponents, O } from 'reactxx-typings'

const usePose =
    <R extends TTyped.Shape = TTyped.Shape>(
        props: TComponents.Props<R>,
        config: TComponents.Config,
        oldResult: TComponents.UseStylesResult<R>
    ) => {
        return oldResult
    }