import { TAtomize } from 'reactxx-typings';

// platform dependent import
import { getTracePath } from 'reactxx-sheeter';


export const trace = (values: TAtomize.AtomicArray) => values.map(v => getTracePath(v)).join('\n')
export const traceAtomizedRuleset = (rs: TAtomize.AtomizedRuleset) => {
    const res: string[] = [`******************** name: ${rs.name}`]
    rs.list.forEach(v => {
        if (v.atomicArray.length === 0) return
        res.push(`***`)
        if (v.conditions && v.conditions.length > 0) res.push(`conditions: ${JSON.stringify(v.conditions)}`)
        v.atomicArray.forEach(v => res.push(v + ' {' + getTracePath(v) + '}'))
    })
    return res.join('\n')
}

