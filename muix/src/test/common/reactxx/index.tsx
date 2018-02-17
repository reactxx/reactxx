import React from 'react'
import { Text, AppContainer } from 'reactxx'

const AppNoTheme: React.SFC = props => <Text className={{ color: 'red', fontWeight: 'normal' }} style={{ fontWeight: 'bold' }} classes={{ root: { textDecoration: 'underline', color: 'blue' } }}>
  red, bold, underline{' '}
  <Text onPress={() => alert('blue click')} className={{ color: 'blue', fontWeight: 'bold' }} style={{ fontWeight: 'normal' }} classes={{ root: { textDecoration: 'underline' } }}>
    blue, underline, pointer cursor (is clickable)
  </Text>
</Text>

const App: React.SFC = props => <AppContainer themerProps={{ creator: () => ({ direction: 'ltr' }) }}>
  <Text className={theme => ({ color: 'red', fontWeight: 'bold', textDecoration: 'underline' })}>
    red, bold, underline
  </Text>
  <Text onPress={() => alert('blue click')} style={theme => ({ color: 'blue', fontWeight: 'normal', textDecoration: 'underline' })} >
    blue, underline, on new line, pointer cursor (is clickable)
  </Text>
</AppContainer>

const AppThemeOverride: React.SFC = props => <AppContainer themerProps={{ creator: () => ({ direction: 'ltr', overrides: { BaseText: { root: {}} } }) }}>
  <Text className={theme => ({ color: 'red', fontWeight: 'bold', textDecoration: 'underline' })}>
    red, bold, underline
  </Text>
  <Text onPress={() => alert('blue click')} style={theme => ({ color: 'blue', fontWeight: 'normal', textDecoration: 'underline' })} >
    blue, underline, on new line, pointer cursor (is clickable)
  </Text>
</AppContainer>


export default App