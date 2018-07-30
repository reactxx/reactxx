import React from 'react'
import { deepMerges } from 'reactxx-sheeter'

import * as fela from 'reactxx-fela'

const names = fela.rulesetToClassNames({
    '& + &': {
        color: 'red',
        fontSize: 23
    }
} as any)

// const style2 = ((classSelectors = fela.getClassSelectors(['disabled'])) => theme => ({
//     root: {
//         width: 200,
//         height: 40,
//         margin: 10,
//         backgroundColor: 'red',
//         ':hover': {
//             backgroundColor: 'yellow',
//         },
//         [`&${classSelectors.disabled}`]: {
//             '&:hover': {
//                 backgroundColor: 'blue',
//             }
//         },
//         [`&:hover:not(${classSelectors.disabled})`]: {
//             backgroundColor: 'green',
//         },
//     } as React.CSSProperties,
//     disabled: {
//         [`id${classSelectors.disabled}`]: '',
//         color: 'white'
//     } as React.CSSProperties,

// }))()(null)

// const style = ((classSelectors = fela.getClassSelectors(['disabled'])) => ({
//     root: {
//         margin: 10,
//         padding: 10,
//         maxWidth: 200,
//         backgroundColor: 'red',
//         ':hover': {
//             backgroundColor: 'yellow',
//         },
//         [`&${classSelectors.disabled}`]: {
//             '&:hover': {
//                 backgroundColor: 'blue',
//             }
//         },
//         [`&:hover:not(${classSelectors.disabled})`]: {
//             backgroundColor: 'green',
//         },
//     } as React.CSSProperties,
//     disabled: {
//         [`id${classSelectors.disabled}`]: '',
//         color: 'white'
//     } as React.CSSProperties,
// }))()

// const App: React.SFC = () => {
//     return <React.Fragment>
//         <div className={fela.rulesetToClassNames2(deepMerges({}, [style.root, style.disabled]))}>
//           <div className={fela.rulesetToClassNames2(deepMerges({}, [style.root]))}>Hallo</div>
//         </div>

//     </React.Fragment>
// }

const App: React.SFC = () => <h2>'Hallo world'</h2>

export default App

