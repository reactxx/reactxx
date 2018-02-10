import React from 'react'
import { Text, AppContainer } from 'muix-prim5s'

const App: React.SFC = props => <AppContainer themerProps={{ creator: () => ({ direction: 'ltr' }) }}>
  <Text className={theme => ({ color: 'red' })} style={theme => ({ fontWeight: 'bold' })} classes={theme => ({ root: { textDecoration: 'underline' } })}>HALLO WOLD 1
    <Text onClick={() => alert('blue click')} className={{ color: 'blue' }} style={{ fontWeight: 'bold' }} classes={{ root: { textDecoration: 'underline' } }}>HALLO WOLD 2</Text>
  </Text>
</AppContainer>

export default App

