import React from 'react'
import { View, Text } from 'react-native'
import { View as ViewX, Text as TextX } from 'reactxx'

const AppWeb: React.SFC = props => <div style={{ marginTop: '20px', backgroundColor: 'red', overflow: 'scroll' }}>
  <span style={{ color: 'yellow', fontSize: '24px' }} onClick={ev => alert('hallo web world')}>HALLO WEB WORLD</span>
</div>

const AppNative: React.SFC = props => <View style={{ marginTop: 20, backgroundColor: 'red', overflow: 'visible' }}>
  <Text style={{ color: 'yellow', fontSize: 24 }} onPress={() => alert('hallo native world')}>HALLO NATIVE WORLD</Text>
</View>

const AppX: React.SFC = props => <ViewX style={{ marginTop: 20, backgroundColor: 'red', $web: { overflow: 'scroll' }, $native: { overflow: 'visible'} }}>
  <TextX style={{ color: 'yellow', fontSize: 24 }} onPress={ev => alert('hallo xplatform world')}>HALLO XPLATFORM WORLD</TextX>
</ViewX>


//===================================================

/*World is more complicated
- all web styling possibilities inc media queries, pseudoselectors etc.
- animation
- robust component customization
- theming
- single project and single npm package for both web and native
- ??? material-ui codebase
*/