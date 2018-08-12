
import React from 'react';

import CustomizedBadge from './CustomizedBadge'
import SimpleBadge from './SimpleBadge'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>CustomizedBadge</h2>
<div style={{flexShrink: 0}}>
  <CustomizedBadge/>
</div>

<h2>SimpleBadge</h2>
<div style={{flexShrink: 0}}>
  <SimpleBadge/>
</div>

</div>

export default App
