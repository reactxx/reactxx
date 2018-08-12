
import React from 'react';

import ButtonAppBar from './ButtonAppBar'
import DenseAppBar from './DenseAppBar'
import MenuAppBar from './MenuAppBar'
import SimpleAppBar from './SimpleAppBar'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ButtonAppBar</h2>
<div style={{flexShrink: 0}}>
  <ButtonAppBar/>
</div>

<h2>DenseAppBar</h2>
<div style={{flexShrink: 0}}>
  <DenseAppBar/>
</div>

<h2>MenuAppBar</h2>
<div style={{flexShrink: 0}}>
  <MenuAppBar/>
</div>

<h2>SimpleAppBar</h2>
<div style={{flexShrink: 0}}>
  <SimpleAppBar/>
</div>

</div>

export default App
