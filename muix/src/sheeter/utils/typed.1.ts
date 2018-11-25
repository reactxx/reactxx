import { TSheeter, TComponents, TCommonStyles, TAtomize } from 'reactxx-typings'

//type Ids = 'w' | 'nt' |  'nv' | 'ct' | 'cv'

type Item<T extends TCommonStyles.RulesetIds> = TCommonStyles.RulesetType<T> | T
type Rules<T extends TCommonStyles.RulesetIds> = Item<T> | Item<T>[]

interface RulesShape {
    [name: string]: TCommonStyles.RulesetIds
}
type Sheet<T extends RulesShape> = {
    [P in keyof T]: Rules<T[P]>
}

interface Shape extends RulesShape {
    root: 'View',
    label: 'Text',
}

const $if = <T extends TCommonStyles.RulesetIds>(...par: T[]) => null as T

const sheet: Sheet<Shape> = {
    root: [
        'View',
        { margin: 0 },
        $if<'View'>()
    ],
    label: [
        'Text',
        { color: 'red' }
    ]
}

type TIf<T extends TCommonStyles.RulesetIds> = (par: T | T[]) => T



