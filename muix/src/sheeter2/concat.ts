
const concat = <T = any>(arr1: Array<T>, arr2: Array<T>) => arr1.concat(arr2)

const concats = <T = any>(...pushes: Array<Array<T>>) => {
  if (!pushes || pushes.length === 0) return []
  if (pushes.length === 1) return pushes[0] || []
  let res: Array<T> = null
  for (let i = 0; i < pushes.length; i++) {
    const pi = pushes[i]
    if (!pi || pi.length === 0) continue
    res = res ? res.concat(pi) : pi
  }
  return res || []
}

