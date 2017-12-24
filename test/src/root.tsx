import React from 'react'
import ReactDOM from 'react-dom'

import MuixApp from 'muix'
import { Play } from 'muix-icons/Play'
import { View, Text } from 'muix-primitives'

export const App: React.SFC = () => <View><Text>{Play} {Play}</Text><MuixApp /> <MuixApp /></View>