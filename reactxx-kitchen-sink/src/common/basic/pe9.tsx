import React from 'react'

import { Types } from 'reactxx-basic'
import { View, Text, Icon } from 'reactxx-primitives'
import MDI from 'reactxx-mdi'

const App: React.SFC = props => <View>
  <Text onPress={ev => console.log(React.Children.only(ev.current.children))}>Text.onPress</Text>
  <Icon onPress={ev => console.log(React.Children.only(ev.current.children))} data={MDI.Clock} />
  <View onPress={ev => console.log(React.Children.only(ev.current.children))}><Text>View.onPress</Text></View>
  <View onPressIn={ev => console.log(React.Children.only(ev.current.children))}><Text>View.onPressIn</Text></View>
  <View onPressOut={ev => console.log(React.Children.only(ev.current.children))}><Text>View.onPressOut</Text></View>
  <Text
    onPress={ev => console.log(React.Children.only(ev.current.children))}
    $web={{ onClick: (ev: Types.MouseEventPar) => console.log(React.Children.only(ev.current.children)) }}
    $native={{ onPress: (ev: Types.NativeEventPar) => console.log(React.Children.only(ev.current.children)) }}
  >Text.$web.onClick or Text.$native.onPress</Text>
</View>

export default App

