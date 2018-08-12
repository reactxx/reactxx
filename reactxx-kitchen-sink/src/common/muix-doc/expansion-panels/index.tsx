
import React from 'react';

import ControlledExpansionPanels from './ControlledExpansionPanels'
import DetailedExpansionPanel from './DetailedExpansionPanel'
import SimpleExpansionPanel from './SimpleExpansionPanel'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ControlledExpansionPanels</h2>
<div style={{flexShrink: 0}}>
  <ControlledExpansionPanels/>
</div>

<h2>DetailedExpansionPanel</h2>
<div style={{flexShrink: 0}}>
  <DetailedExpansionPanel/>
</div>

<h2>SimpleExpansionPanel</h2>
<div style={{flexShrink: 0}}>
  <SimpleExpansionPanel/>
</div>

</div>

export default App
