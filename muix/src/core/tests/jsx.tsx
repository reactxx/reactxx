/** @jsx createElement */
import { createElement, classNames, TSheeter, adjustRulesetCompiled } from 'reactxx-core'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'disabled'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeWeb<'webOnly'>
}

// className?: className?: {} | string | ({} | string)[]
const style = adjustRulesetCompiled({
    color: 'red'
})
const sheet: TSheeter.Sheet<Shape> = { 
    root: {
        color: 'gray'
    },
    disabled: {
        margin: 4,
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

const root = classNames(style, sheet.root, sheet.disabled, { fontWeight: 'bold' })

const App: React.SFC = props => <div>
    <h1 classNameX={[sheet.root, style, sheet.disabled]}>HALLO</h1>
    <h1 classNameX={root}>HALLO</h1>
    <h1 classNameX={style}>HALLO</h1>
    <h1 classNameX={[style, { fontWeight: 'normal' }]}>HALLO</h1>
    <h1 classNameX={[root, { fontWeight: 'normal' }]}>HALLO</h1>
    {/*
    */}
</div>

export default App