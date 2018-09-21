import { TWithStyles } from '../d-index'

export const globalOptions: TWithStyles.GlobalState = {
    namedThemes: {},
    getPipeCounter: () => pipeCounter++
}

let pipeCounter = 1