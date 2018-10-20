import warning = require('warning');

export const parse = (encoded: string) => {
    warning(regx.test(encoded), `Found '${encoded}, expected e.g '-640' or '1024-' or '640-1024'`)
    return encoded.split('-').map(i => i ? parseInt(i) : 0) as [number, number]
}
const regx = /^\d+-\d+|-\d+|\d+-$/

export const intervalToSelector = (encoded: string) => {
    const [from, to] = parse(encoded)
    if (!from) return `@media (max-width: ${to - 1}px)`
    if (!to) return `@media (min-width: ${from}px)`
    return `@media (min-width: ${from}px) and (max-width: ${to - 1}px)`
}

export const test = (interval: [number, number], width) => {
    const [min, max] = interval
    return min <= width && (!max || max < width)
}

