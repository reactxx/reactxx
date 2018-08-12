
import React from 'react';

import InsetDividers from './InsetDividers'
import ListDividers from './ListDividers'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>InsetDividers</h2>
<div style={{flexShrink: 0}}>
  <InsetDividers/>
</div>

<h2>ListDividers</h2>
<div style={{flexShrink: 0}}>
  <ListDividers/>
</div>

</div>

export default App
