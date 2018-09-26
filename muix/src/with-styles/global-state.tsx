import { TWithStyles } from 'reactxx-typings'

export const globalOptions: TWithStyles.GlobalState = {
    namedThemes: {},
    getPipeCounter: () => pipeCounter++
}

let pipeCounter = 1