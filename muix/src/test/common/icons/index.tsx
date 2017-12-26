import React from 'react'
import ReactDOM from 'react-dom'

import { Text } from 'muix-primitives'

import { Play } from 'muix-icons/Play'
import { icons } from 'muix-icons/index'

const AppComp: React.SFC = props => <Text>
  Play icon: {Play}={icons.Play}
 </Text>

export default AppComp


