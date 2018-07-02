import React from 'react'
import ReactDOM from 'react-dom'

import Button from 'material-ui/Button'

//import { test } from '../../basic/common/sheeter-mediaq-test'
import { test } from '../../basic/common/sheeter-test'
test()

//debugger
//const res = Array.from(new Set(['a', 'b', 'c'].concat(['d', 'b', 'f'])))
////const res = [...new Set(['a', 'b', 'c', 'd', 'b', 'f'])]
//debugger

//import App from '../common/basic/pe6'
//import App from '../common/app/index'
//import App from '../common/with-styles'
//import App from '../common/components/responsible-drawer/responsible-drawer'
//import App from '../common/mediaq/me3'
//import App from '../common/animation/ae1'
//import App from '../common/basic/pe4'
//import App from '../common/component/ce3'
//const App: React.SFC = () => <Button>Hallo world</Button>
import App from '../common/muix/m1'


ReactDOM.render(<App />, document.getElementById('root'))

