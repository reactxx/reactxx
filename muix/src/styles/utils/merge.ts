import { TEngine, TTyped, TComponents } from 'reactxx-typings';
import { deepMerge, deepMerges } from './deep-merge'
import { isAtomized } from './atomize-low';
import { wrapRuleset } from './atomize';

export const mergeCodeProps = (propsCode: TTyped.PropsCode | any, props: TComponents.Props[]) => {
    if (!props || props.length === 0) return
    let rootWebProps, rootNativeProps, rootProps
    for (const p of props) {
        if (!p) continue
        Object.assign(propsCode, p)
        // merge child component root props
        const { $rootWebProps, $rootNativeProps, $rootProps } = p
        window.isWeb && $rootWebProps && Object.assign(rootWebProps || (rootWebProps = {}), $rootWebProps)
        !window.isWeb && $rootNativeProps && Object.assign(rootNativeProps || (rootNativeProps = {}), $rootNativeProps)
        $rootProps && Object.assign(rootProps || (rootProps = {}), $rootProps)
    }
    if (rootWebProps) propsCode.$rootWebProps = rootWebProps
    if (rootNativeProps) propsCode.$rootNativeProps = rootNativeProps
    if (rootProps) propsCode.$rootProps = rootProps
}

// immutable
export const mergeRulesets = (sources: TEngine.Queryables[]) => {
    if (!sources || sources.length === 0) return null
    let res: TEngine.Queryables = null
    let first = true
    for (const src of sources) {
        if (!src) continue
        if (!isAtomized(src))
            throw 'All rulesets must be atomized first for mergeRulesets'
        res = first ? src : [...res, ...src]
        first = false
    }
    return wrapRuleset(res)
}

// immutable
export const mergeSheets = (sources: TEngine.Sheet[]) => {
    if (!sources || sources.length === 0) return null
    const ruleLists: Record<string, Array<any>> = {}
    for (const src of sources) {
        if (!src) continue
        for (const p in src) {
            const value = src[p]
            if (!value) continue
            const arr = ruleLists[p] || (ruleLists[p] = [])
            arr.push(value)
        }
    }
    const res = {}
    for (const p in ruleLists)
        res[p] = mergeRulesets(ruleLists[p])
    return res as TEngine.Sheet
}

export const mergeDeep = (sources: {}[]) => {
    if (!sources || sources.length === 0) return null
    let count = 0
    let res = null
    for (const src of sources) {
        if (!src) continue
        switch (count) {
            case 0: res = src; count++; break
            case 1: res = deepMerges({}, [res, src]); count++; break
            default: res = deepMerge(res, src); count++; break
        }
    }
    return res
}

