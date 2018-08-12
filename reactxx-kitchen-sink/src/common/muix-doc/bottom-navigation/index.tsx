
import React from 'react';

import LabelBottomNavigation from './LabelBottomNavigation'
import SimpleBottomNavigation from './SimpleBottomNavigation'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>LabelBottomNavigation</h2>
<div style={{flexShrink: 0}}>
  <LabelBottomNavigation/>
</div>

<h2>SimpleBottomNavigation</h2>
<div style={{flexShrink: 0}}>
  <SimpleBottomNavigation/>
</div>

</div>

export default App
