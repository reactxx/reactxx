import React from 'react'
import ReactDOM from 'react-dom'

import { Play } from 'muix-icons/current/Play'
import { ruleToClassNames } from 'muix-styles/web/inline-styles'

const AppComp: React.SFC = props => {
  const classes = ruleToClassNames({ color: 'red' })
  const classes2 = ruleToClassNames({ color: 'red' })
  return <h3 className={classes}>{Play} = {MDI.icons.Play} = {classes} = {classes2}</h3>
}

export const init = () => ReactDOM.render(<AppComp />, document.getElementById('content')) 
