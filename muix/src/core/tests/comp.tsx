/** @jsx createElement */
import { TVariants, TAtomize, TComponents, TCommonStyles, TSheeter } from 'reactxx-typings'
import { createElement } from 'reactxx-core'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root'> & TSheeter.ShapeTexts<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeMarks<'webOnly'>
    sheetFlags: TSheeter.ShapeMarks<'isDisabled' | 'isActive'>
    breakpoints: TSheeter.ShapeMarks<'isTabletWidth'>
    style: 'View'
}

interface Shape3 extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root'> & TSheeter.ShapeTexts<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeMarks<'webOnly'>
    //sheetFlags: TSheeter.ShapeFlags<'disabled' | 'active'>
    style: 'View'
}


const sheet: Shape['$SheetOrCreator'] = theme => {
    const res: Shape['$Sheet'] = {
        root: {
            margin: 4,
            $sheetFlags: {
                isDisabled: [{
                    //color: '$sheetFlags|disabled',
                }],
            },
            $web: [{
                $sheetFlags: {
                    isDisabled: [{
                        //color: '$sheetFlags|disabled',
                    }],
                },
            }],
        },
        label: {
            $web: {
                color: 'gray',
                $sheetFlags: {
                    isDisabled: [{
                        color: '$sheetFlags|disabled',
                    }],
                },
            },
            //margin:0
        },
        webOnly: {
        },
        nativeOnly: {
            $native: {
                margin: 20,
            }
        },
    }
    return res
}

let Inner: TComponents.ComponentType<Shape>

const App: TComponents.SFCCode<Shape> = props => {
    const { classNameX, classes, styleX, theme, toClassNames, breakpoints } = props
    //if (breakpoints.isTabletWidth) flags.isTabletWidth = true
    const root = toClassNames([classes.root, { margin: 0 }])
    return <div>
        <Inner
            styleX={[
                {
                   $web: {},
                    $native: {},
                    margin: 0,
                },
                styleX
            ]}
            classes={theme => {
                const res: typeof Inner['classes'] = {
                    root: [{ $sheetFlags: {
                        isDisabled: {}, root: {}, isTabletWidth: {}
                    }, margin: 0, $web: [{ $sheetFlags: {}, cursor: 'pointer' }], $native: [{ $sheetFlags: {}, margin: 0 }] }],
                    nativeOnly: { $native: [{ margin: 0 }] },
                    webOnly: { $web: [{ cursor: 'pointer' }] }
                }
                return res
            }}
            classNameX={theme => {
                const res: typeof Inner['classNamex'] = [
                    { margin: 0 }, classNameX, root
                ]
                return res
            }}
        />
        <Inner
            classes={theme => ({ root: [classes.root, { margin: 0 }] })}
            classNameX={theme => [{ margin: 0 }, root, classes.label, { $web: { cursor: 'pointer' } }]}
        />
    </div>

}


const App2: TComponents.SFCCode<Shape3> = props => {
    const { classNameX, classes, styleX, theme, toClassNames } = props
    const root = toClassNames([classes.root, { margin: 0 }])
    return <div>
        <Inner
            styleX={[
                {
                    $web: {},
                    $native: {},
                    margin: 0,
                },
                styleX
            ]}
            classes={theme => {
                const res: typeof Inner['classes'] = {
                    root: [{ $sheetFlags: {}, margin: 0, $web: [{ $sheetFlags: {}, cursor: 'pointer' }], $native: [{ $sheetFlags: {}, margin: 0 }] }],
                    nativeOnly: { $native: [{ margin: 0 }] },
                    webOnly: { $web: [{ cursor: 'pointer' }] }
                }
                return res
            }}
            classNameX={theme => {
                const res: typeof Inner['classNamex'] = [
                    { margin: 0 }, classNameX, root
                ]
                return res
            }}
        />
        <Inner
            classes={theme => ({ root: [classes.root, { margin: 0 }] })}
            classNameX={theme => [{ margin: 0 }, root, classes.label, { $web: { cursor: 'pointer' } }]}
        />
    </div>

}

const root: TAtomize.Ruleset = null

const classes: TSheeter.PartialSheetCreator<Shape> = theme => {
    const res: TSheeter.PartialSheet<Shape> = {
        root: [{ margin: 0 }]
    }
    //Partial<TSheeter.SheetCommon<Shape> & TSheeter.SheetNative<Shape> & TSheeter.SheetWeb<Shape>> = {
    return res
}

const classes1: TSheeter.PartialSheetCreator<Shape> = theme => ({
    root: { margin: 0, x: 1 }
})

const classes2: TSheeter.PartialSheet<Shape> = {
    //Partial<TSheeter.SheetCommon<Shape> & TSheeter.SheetNative<Shape> & TSheeter.SheetWeb<Shape>> = {
    root: { margin: 0 },
    nativeOnly: { $native: {} }
}// as Partial<TSheeter.SheetCommon<Shape>>

/*
Type '(theme: EmptyInterface) => { root: { margin: number; $web: (AtomizedRuleset | { cursor: string; })[]; $native: {}[]; }; nativeOnly: { $native: { margin: number; }[]; }; webOnly: { $web: { cursor: string; }[]; }; }' is not assignable to type 'PartialSheetOrCreator<Shape>'.
  Type '(theme: EmptyInterface) => { root: { margin: number; $web: (AtomizedRuleset | { cursor: string; })[]; $native: {}[]; }; nativeOnly: { $native: { margin: number; }[]; }; webOnly: { $web: { cursor: string; }[]; }; }' is not assignable to type 'PartialSheetCreator<Shape>'.
    Type '{ root: { margin: number; $web: (AtomizedRuleset | { cursor: string; })[]; $native: {}[]; }; nativeOnly: { $native: { margin: number; }[]; }; webOnly: { $web: { cursor: string; }[]; }; }' is not assignable to type 'SheetCommonPartial2<Shape>'.
      Types of property 'root' are incompatible.
        Type '{ margin: number; $web: (AtomizedRuleset | { cursor: string; })[]; $native: {}[]; }' is not assignable to type 'Ruleset<"root", Shape> | Ruleset<"root", Shape>[]'.
          Type '{ margin: number; $web: (AtomizedRuleset | { cursor: string; })[]; $native: {}[]; }' is not assignable to type 'Ruleset<"root", Shape>[]'.
            Property 'length' is missing in type '{ margin: number; $web: (AtomizedRuleset | { cursor: string; })[]; $native: {}[]; }'. */
type T = TCommonStyles.RulesetNative<'View'> | TCommonStyles.RulesetNative<'View'>[]
let t: T = []

// const root = classNames(style, sheet.root, sheet.label, { fontWeight: 'bold' })

// const App: React.SFC = props => <div>
//     <h1 classNameX={[sheet.root, style, sheet.label]}>HALLO</h1>
//     <h1 classNameX={root}>HALLO</h1>
//     <h1 classNameX={style}>HALLO</h1>
//     <h1 classNameX={[style, { fontWeight: 'normal' }]}>HALLO</h1>
//     <h1 classNameX={[root, { fontWeight: 'normal' }]}>HALLO</h1>
//     {/*
//     */}
// </div>

// export default App

interface TTyped {
    type: string
}

interface TTyped1 extends TTyped {
    type: 't1'
    v1?: number
}

interface TTyped2 extends TTyped {
    type: 't2'
    v2?: string
}

interface TTyped3 {
    v3?: boolean
}

type TAll = (TTyped1 | TTyped2 | TTyped3)[]

const all: TAll = [
    {
        type: 't1',
        v1: 1
    },
    {
        type: 't2',
        //v2: '2'
    },
    {
        v3: true,
    },
]

type RulesetOrAtomized<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
    TSheeter.Ruleset<T, R> | TAtomize.Ruleset

type SheetCommon<R extends Shape> = keyof TSheeter.getCommon<R> extends never ? TSheeter.FakeInterface :
    { [P in keyof TSheeter.getCommon<R>]: RulesetOrAtomized<TSheeter.getCommon<R>[P], R> | RulesetOrAtomized<TSheeter.getCommon<R>[P], R>[] }

const TAtomizeRuleset: TAtomize.Ruleset = null
const TAtomizeAtomicArray: TAtomize.AtomicArray = null
const sheet3: Partial<SheetCommon<Shape>> = {
    root: [
        TAtomizeRuleset,
        TAtomizeAtomicArray,
        {
            margin: 0,
            $sheetFlags: {
                isDisabled: {
                    //color: ''
                }
            }
        }]
}

