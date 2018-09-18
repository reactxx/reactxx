/** @jsx createElement */
import { createElement, classNames, TSheeter, TVariants, adjustRulesetCompiled, traceAtomizedRuleset, toAtomizedSheet } from 'reactxx-core'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeWeb<'webOnly'>
    sheetFlags: TSheeter.ShapeFlags<'disabled' | 'active'>
}

type t = TVariants.WhenFlagKeys<Shape>
type t2 = TSheeter.getFlags<Shape>

// className?: className?: {} | string | ({} | string)[]
const style = adjustRulesetCompiled({
    color: 'red'
})
const sheet: TSheeter.Sheet<Shape> = {
    root: {
        color: 'root',
        margin: 4,
        $whenFlag: {
            disabled: {
                color: '$whenFlag|disabled',
            },
        }
    },
    label: {
        color: 'gray',
        $web: {
            ':hover': {
                $mediaq: {},
                $whenFlag: {
                    root: {
                        color: 'label|$whenFlag|root',
                        $web: [
                            {
                                ':hover': [
                                    {
                                        $whenFlag: {},
                                        ':active': {},
                                        cursor: 'pointer',
                                    }
                                ]
                            },
                            {
                                margin: 10
                            }
                        ],
                    },
                }
            },

        }
    },
    webOnly: {
        color: 'webOnly',
        $web: {
            color: 'webOnly|$web',
            ':hover': {
                color: 'webOnly|$web|:hover',
                $mediaq: {
                    '640': {
                        color: 'webOnly|$web|:hover|$mediaq|640'
                    }
                },

            },

        }
    },
    nativeOnly: {
        color: 'nativeOnly',
        $native: {

        }
    },
}


const compSheet = toAtomizedSheet(sheet)

let trace = traceAtomizedRuleset(compSheet.root)
trace = traceAtomizedRuleset(compSheet.label)

const root = classNames(style, sheet.root, sheet.label, { fontWeight: 'bold' })

const App: React.SFC = props => <div>
    <h1 classNameX={[sheet.root, style, sheet.label]}>HALLO</h1>
    <h1 classNameX={root}>HALLO</h1>
    <h1 classNameX={style}>HALLO</h1>
    <h1 classNameX={[style, { fontWeight: 'normal' }]}>HALLO</h1>
    <h1 classNameX={[root, { fontWeight: 'normal' }]}>HALLO</h1>
    {/*
    */}
</div>

export default App