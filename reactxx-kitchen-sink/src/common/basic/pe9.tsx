import React from 'react'

import { View, Text, Icon } from 'reactxx-primitives'
import MDI from 'reactxx-mdi'

const App: React.SFC = props => <View>
  <Text onPress={ev => console.log('Text.onPress')}>Text.onPress</Text>
  <Icon onPress={ev => console.log('Icon.onPress')} data={MDI.Clock} />
  <View onPress={ev => console.log('View.onPress')}><Text>View.onPress</Text></View>
  <View onPressIn={ev => console.log('View.onPressIn')}><Text>View.onPressIn</Text></View>
  <View onPressOut={ev => console.log('View.onPressOut')}><Text>View.onPressOut</Text></View>
</View>

export default App

