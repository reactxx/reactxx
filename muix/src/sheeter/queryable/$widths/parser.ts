import warning = require('warning');
import { TEngine } from 'reactxx-typings'

export const parse = (encoded: string) => {
    warning(regx.test(encoded), `Found '${encoded}, expected e.g '-640' or '1024-' or '640-1024'`)
    const res = encoded.split('-').map(i => i ? parseInt(i) : 0) as [number, number]
    return res[1] === 0 ? res[0] : res
}
const regx = /^\d+-\d+|-\d+|\d+-$/

export const intervalToSelector = (interval: TEngine.WidthInterval) => {
    //**WIDHT**
    if (typeof interval === 'number')
        return `@media (min-width: ${interval + 1}px)`
    const [from, to] = interval
    if (!from) return `@media (max-width: ${to}px)`
    return `@media (min-width: ${from + 1}px) and (max-width: ${to}px)`
}

