
import { TTransition } from '../d-index'
export namespace TAnimatedNative {

}

interface Animation extends TTransition.GroupProp {
    opened: boolean
    hash: string
}

type Animations = Record<string, Animation>

const simpleName = ''

export class NativeAnimated {
    animations: Animations
    setTransition(deffered: TTransition.DefferedNative, values: TTransition.TValues) {
        const { $duration, $easing, usedProps } = deffered
        checkValues(usedProps, values)
    }
}

let checkValues

const s = ''
