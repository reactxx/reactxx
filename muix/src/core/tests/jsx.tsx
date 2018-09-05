/** @jsx ReactXX */
import { ReactXX, classNames, queryClassNames, compileClassName, compileSheet } from 'reactxx-core'

// className?: className?: {} | string | ({} | string)[]
const style = compileClassName({
    color: 'red'
})

const sheet = compileSheet({
    root: {
        color: 'gray'
    },
    disabled: { 
        
    }
})

const root = classNames(style, sheet.root, sheet.disabled, { fontWeight: 'bold' })

const App: React.SFC = props => <div>
    <h1 classNamex={[sheet.root, style, sheet.disabled]}>HALLO</h1>
    <h1 classNamex={root}>HALLO</h1>
    <h1 classNamex={style}>HALLO</h1>
    <h1 classNamex={[style, { fontWeight: 'normal' }]}>HALLO</h1>
    <h1 classNamex={[root, { fontWeight: 'normal' }]}>HALLO</h1>
    {/*
    */}
</div>

export default App