import React from 'react'
import ReactDOM from 'react-dom'

import App from '../common/root'
//import App from './layout/root'

export const init = () => ReactDOM.render(<App />, document.getElementById('content')) 
