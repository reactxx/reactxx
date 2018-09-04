/** @jsx ReactXX */
import { ReactXX, classNames, queryClassNames, compileClassName, compileSheet } from 'reactxx-core'

// className?: className?: {} | string | ({} | string)[]
const style = compileClassName({
    color: 'red'
})

const sheet = compileSheet<'root' | 'disabled'>({
    root: {
        color: 'gray'
    },
    disabled: { 
        
    }
})

const root = classNames(style, sheet.root, sheet.disabled, { fontWeight: 'bold' })

const App: React.SFC = props => <div>
    <h1 css={[sheet.root, style, sheet.disabled]}>HALLO</h1>
    <h1 css={root}>HALLO</h1>
    <h1 css={style}>HALLO</h1>
    <h1 css={[style, { fontWeight: 'normal' }]}>HALLO</h1>
    <h1 css={[root, { fontWeight: 'normal' }]}>HALLO</h1>
    {/*
    */}
</div>

export default App