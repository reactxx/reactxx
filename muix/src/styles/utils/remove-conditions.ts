import { TTyped, TEngine } from 'reactxx-typings'

export const removeConditions = (ruleset: TEngine.Queryables) => {
    if (!ruleset || ruleset.length === 0) return ruleset
    let res = ruleset
    for (const q of res) {
        if (q.conditions && res === ruleset) {
            res = [...ruleset]
            res.$r$ = true
            for (let i = 0; i < res.length; i++) {
                const q = res[i]
                if (!q.conditions) continue
                if (window.isWeb)
                    res[i] = [...q]
                else {
                    const qq = {...q}
                    delete qq.conditions
                    res[i] = qq
                }
            }
            break
        }
    }
    return res
}