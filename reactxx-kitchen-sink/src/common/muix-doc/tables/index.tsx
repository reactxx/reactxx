
import React from 'react';

import CustomizedTable from './CustomizedTable'
import CustomPaginationActionsTable from './CustomPaginationActionsTable'
import EnhancedTable from './EnhancedTable'
import SimpleTable from './SimpleTable'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>CustomizedTable</h2>
<div style={{flexShrink: 0}}>
  <CustomizedTable/>
</div>

<h2>CustomPaginationActionsTable</h2>
<div style={{flexShrink: 0}}>
  <CustomPaginationActionsTable/>
</div>

<h2>EnhancedTable</h2>
<div style={{flexShrink: 0}}>
  <EnhancedTable/>
</div>

<h2>SimpleTable</h2>
<div style={{flexShrink: 0}}>
  <SimpleTable/>
</div>

</div>

export default App
