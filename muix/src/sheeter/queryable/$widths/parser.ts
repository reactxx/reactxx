import warning = require('warning');
import { TEngine } from 'reactxx-typings'

export const parse = (encoded: string) => {
    warning(regx.test(encoded), `Found '${encoded}, expected e.g '-640' or '1024-' or '640-1024'`)
    const res = encoded.split('-').map(i => i ? parseInt(i) : 0) as [number, number]
    return res[1] === 0 ? res[0] : res
}
const regx = /^\d+-\d+|-\d+|\d+-$/

export const intervalToSelector = (interval: TEngine.WidthInterval) => {
    if (typeof interval === 'number') return `@media (min-width: ${interval}px)`
    const [from, to] = interval
    if (!from) return `@media (max-width: ${to - 1}px)`
    return `@media (min-width: ${from}px) and (max-width: ${to - 1}px)`
}

export const test = (interval: TEngine.WidthInterval, actWidth: number, registerDir?: Set<number>) => {
    if (registerDir) {
        if (typeof interval === 'number') registerDir.add(interval)
        else {
            registerDir.add(interval[1])
            if (interval[0]) registerDir.add(interval[0])
        }
    }
    return typeof actWidth === 'number' && (typeof interval === 'number' ? actWidth >= interval : actWidth >= interval[0] && actWidth < interval[1])
}

