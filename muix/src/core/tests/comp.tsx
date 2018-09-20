/** @jsx createElement */
import {
    TComponents,
    createElement, classNames, TSheeter, TVariants, adjustRulesetCompiled, traceAtomizedRuleset, atomizeSheet
} from 'reactxx-core'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeWeb<'webOnly'>
    sheetFlags: TSheeter.ShapeFlags<'disabled' | 'active'>
}


const sheet: TSheeter.Sheet<Shape> = {
    root: {
        margin: 4,
        $whenFlag: {
            disabled: {
                color: '$whenFlag|disabled',
            },
        }
    },
    label: {
        $web: {
            color: 'gray',
        },

    },
    webOnly: {
    },
    nativeOnly: {
        $native: {
            margin: 20,
        }
    },
}

let Inner: React.ComponentType<TComponents.Props<Shape>>

const App: TComponents.SFCCode<Shape> = props => {
    const { classNameX, classes, styleX, theme, classNames } = props
    const root = classNames(classes.root, { margin: 0 })
    return <div>
        <Inner
            classes={{ root: classes.label }}
            classNameX={classNameX}
        />
        <Inner
            classes={theme => ({ root: [classes.root, { margin: 0 }] })}
            classNameX={theme => [{ margin: 0 }, root, classes.label, { $web: { cursor: 'pointer' } }]}
        />
    </div>
}

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