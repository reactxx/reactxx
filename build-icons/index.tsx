import React from 'react'
import ReactDOM from 'react-dom' 

import MDI from 'reactxx-mdi'

import { Play } from 'reactxx-mdi/Play'

const AppComp: React.SFC = props => <h3>{Play} = {MDI.Play} </h3>

export const init = () => ReactDOM.render(<AppComp />, document.getElementById('content'))

//export default ['en', 'de', 'es', 'zh'][Math.floor(Math.random() * 3)]



