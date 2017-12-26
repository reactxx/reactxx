import React from 'react'
import ReactDOM from 'react-dom' 

import { Play } from 'muix-icons/Play'
import { icons } from 'muix-icons/index' 

const AppComp: React.SFC = props => <h3>{Play} = {icons.Play} </h3>

export const init = () => ReactDOM.render(<AppComp />, document.getElementById('content'))

//export default ['en', 'de', 'es', 'zh'][Math.floor(Math.random() * 3)]



