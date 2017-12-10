import React from 'react'
import ReactDOM from 'react-dom' 

import { Play } from 'muix-icons/current/Play'
import { ruleToClassNames } from 'muix-styles/web/inline-styles' 

const AppComp: React.SFC = props => <h3>{Play} = {MDI.icons.Play} = {ruleToClassNames({})}</h3>

export const init = () => ReactDOM.render(<AppComp />, document.getElementById('content')) 
