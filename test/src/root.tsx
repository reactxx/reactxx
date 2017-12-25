import React from 'react'
import ReactDOM from 'react-dom'

import MuixApp from 'muix'
import { Play } from 'muix-icons/Play'
import { View, Text } from 'muix-primitives'
import Button from 'muix-components/Button/Button'

export const App: React.SFC = () => <View><Text>{Play}</Text><MuixApp /><Button/></View>