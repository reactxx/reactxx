
import React from 'react';

import DateAndTimePickers from './DateAndTimePickers'
import DatePickers from './DatePickers'
import TimePickers from './TimePickers'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>DateAndTimePickers</h2>
<div style={{flexShrink: 0}}>
  <DateAndTimePickers/>
</div>

<h2>DatePickers</h2>
<div style={{flexShrink: 0}}>
  <DatePickers/>
</div>

<h2>TimePickers</h2>
<div style={{flexShrink: 0}}>
  <TimePickers/>
</div>

</div>

export default App
