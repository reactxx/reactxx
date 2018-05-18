import React from 'react'

import { Icon, View } from 'reactxx-primitives'
import MDI from 'reactxx-mdi'
import { Note } from 'reactxx-mdi/Note'
import { Label } from 'reactxx-mdi/Label'

const App: React.SFC = props => <View>
  <Icon data={Note} />
  <Icon data={MDI.Headset} style={{ fontSize: 32, color: 'red' }} />
  <Icon data={MDI.PageFirst} classes={{ root: { fontSize: 48, color: 'blue' } }} />
  <Icon data={MDI.Keyboard} className={{ color: 'white', width: 40, backgroundColor: 'maroon' }} />
  <Icon data={Label} classes={{ pressable: { $web: { cursor: 'help' } } }} onPress={() => alert('pressed')} />
</View>

export default App

