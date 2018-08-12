
import React from 'react';

import Checkboxes from './Checkboxes'
import CheckboxesGroup from './CheckboxesGroup'
import CheckboxLabels from './CheckboxLabels'
import CustomizedSwitches from './CustomizedSwitches'
import RadioButtons from './RadioButtons'
import RadioButtonsGroup from './RadioButtonsGroup'
import Switches from './Switches'
import SwitchesGroup from './SwitchesGroup'
import SwitchLabels from './SwitchLabels'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>Checkboxes</h2>
<div style={{flexShrink: 0}}>
  <Checkboxes/>
</div>

<h2>CheckboxesGroup</h2>
<div style={{flexShrink: 0}}>
  <CheckboxesGroup/>
</div>

<h2>CheckboxLabels</h2>
<div style={{flexShrink: 0}}>
  <CheckboxLabels/>
</div>

<h2>CustomizedSwitches</h2>
<div style={{flexShrink: 0}}>
  <CustomizedSwitches/>
</div>

<h2>RadioButtons</h2>
<div style={{flexShrink: 0}}>
  <RadioButtons/>
</div>

<h2>RadioButtonsGroup</h2>
<div style={{flexShrink: 0}}>
  <RadioButtonsGroup/>
</div>

<h2>Switches</h2>
<div style={{flexShrink: 0}}>
  <Switches/>
</div>

<h2>SwitchesGroup</h2>
<div style={{flexShrink: 0}}>
  <SwitchesGroup/>
</div>

<h2>SwitchLabels</h2>
<div style={{flexShrink: 0}}>
  <SwitchLabels/>
</div>

</div>

export default App
