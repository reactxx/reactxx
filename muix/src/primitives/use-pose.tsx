import { TTyped, TComponents, O } from 'reactxx-typings'
import posed from "react-pose"

const usePose =
    <R extends TTyped.Shape = TTyped.Shape>(
        props: TComponents.Props<R>,
        config: TComponents.Config,
        oldResult: TComponents.UseStylesResult<R>
    ) => {
        if (!config.$pose) return oldResult
        const poses = {}
        for (const p in config.$pose)
            poses[p] = posed.div(config.$pose[p])
        return {...oldResult, poses}
    }