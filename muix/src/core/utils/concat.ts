export const concats = <T = any>(...arrays: Array<Array<T>>) => {
  if (!arrays) return []
  if (arrays.length === 1) return arrays[0] || []
  let res: Array<T> = null
  for (let i = 0; i < arrays.length; i++) {
    const pi = arrays[i]
    if (!pi || pi.length === 0) continue
    res = res ? res.concat(pi) : pi
  }
  return res || []
}

