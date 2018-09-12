import warning from 'warning'
import { TSheeter } from '../index-d'
import { isObject } from '../utils/deep-merge'

export const styles = (...rulesets: TSheeter.StyleX[]) => {
  if (!rulesets) return undefined
  rulesets = rulesets.filter(r => r)
  if (rulesets.length === 1 && isSimple(rulesets[0])) return rulesets[0]
  const res: TSheeter.StyleX = {}
  rulesets.forEach(r => deepMergeStyles(res, r))
  return res
}

const isSimple = ruleset => { // returns false if name of any object props starts with '$'
  for (const p in ruleset) {
    const val = ruleset[p]
    if (!isObject(val)) continue
    if (p.charAt(0) === '$') return false
    const res = isSimple(val)
    if (!res) return false
  }
  return true
}

const deepMergeStyles = (target, source) => {
  if (!source) return target
  for (const key in source) {
    if (key.charAt(0) === '$') continue
    const sourcep = source[key], targetp = target[key], sourceObj = isObject(sourcep), targetObj = isObject(targetp)
    warning(!targetp || sourceObj === targetObj, 'deepMerge: cannot merge object and non object')
    target[key] = sourceObj ? deepMergeStyles(targetp || {}, sourcep) : sourcep
  }
  const extra = window.isWeb ? source.$web : source.$native
  if (extra) deepMergeStyles(target, deepMergeStyles({}, extra))
  return target
}
