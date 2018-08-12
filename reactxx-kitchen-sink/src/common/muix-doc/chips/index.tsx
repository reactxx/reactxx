
import React from 'react';

import Chips from './Chips'
import ChipsArray from './ChipsArray'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>Chips</h2>
<div style={{flexShrink: 0}}>
  <Chips/>
</div>

<h2>ChipsArray</h2>
<div style={{flexShrink: 0}}>
  <ChipsArray/>
</div>

</div>

export default App
