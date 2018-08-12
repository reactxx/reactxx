
import React from 'react';

import ControlledTooltips from './ControlledTooltips'
import CustomizedTooltips from './CustomizedTooltips'
import DelayTooltips from './DelayTooltips'
import DisabledTooltips from './DisabledTooltips'
import PositionedTooltips from './PositionedTooltips'
import SimpleTooltips from './SimpleTooltips'
import TransitionsTooltips from './TransitionsTooltips'
import TriggersTooltips from './TriggersTooltips'
import VariableWidth from './VariableWidth'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ControlledTooltips</h2>
<div style={{flexShrink: 0}}>
  <ControlledTooltips/>
</div>

<h2>CustomizedTooltips</h2>
<div style={{flexShrink: 0}}>
  <CustomizedTooltips/>
</div>

<h2>DelayTooltips</h2>
<div style={{flexShrink: 0}}>
  <DelayTooltips/>
</div>

<h2>DisabledTooltips</h2>
<div style={{flexShrink: 0}}>
  <DisabledTooltips/>
</div>

<h2>PositionedTooltips</h2>
<div style={{flexShrink: 0}}>
  <PositionedTooltips/>
</div>

<h2>SimpleTooltips</h2>
<div style={{flexShrink: 0}}>
  <SimpleTooltips/>
</div>

<h2>TransitionsTooltips</h2>
<div style={{flexShrink: 0}}>
  <TransitionsTooltips/>
</div>

<h2>TriggersTooltips</h2>
<div style={{flexShrink: 0}}>
  <TriggersTooltips/>
</div>

<h2>VariableWidth</h2>
<div style={{flexShrink: 0}}>
  <VariableWidth/>
</div>

</div>

export default App
