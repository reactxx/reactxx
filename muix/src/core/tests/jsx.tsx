/** @jsx createElement */
import { createElement, classNames, TSheeter, TRulesetConditions, adjustRulesetCompiled } from 'reactxx-core'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeWeb<'webOnly'>
    sheetFlags: TSheeter.ShapeFlags<'disabled' | 'active'>
}

type t = TRulesetConditions.WhenUsedKeys<Shape>
type t2 = TSheeter.getFlags<Shape>

// className?: className?: {} | string | ({} | string)[]
const style = adjustRulesetCompiled({
    color: 'red'
})
const sheet: TSheeter.Sheet<Shape> = { 
    root: {
        margin: 4,
        $whenUsed: {
            disabled: {},
        }
    },
    label: {
        color: 'gray',
        $web: {
            ':hover': {
                $mediaq: {},
                $whenUsed: {
                    root: {
                        $before: {},
                        $web: {
                            ':hover': {
                                
                            }
                        },
                        $native: {
                            
                        },
                        

                    },
                }
            },

        }
    },
    webOnly: {
        $web: {
            ':hover': {
                $mediaq: {},
                
            },

        }
    },
    nativeOnly: {
        $native: {

        }
    },
}

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