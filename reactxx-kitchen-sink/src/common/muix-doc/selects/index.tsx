
import React from 'react';

import ControlledOpenSelect from './ControlledOpenSelect'
import DialogSelect from './DialogSelect'
import MultipleSelect from './MultipleSelect'
import NativeSelects from './NativeSelects'
import SimpleSelect from './SimpleSelect'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ControlledOpenSelect</h2>
<div style={{flexShrink: 0}}>
  <ControlledOpenSelect/>
</div>

<h2>DialogSelect</h2>
<div style={{flexShrink: 0}}>
  <DialogSelect/>
</div>

<h2>MultipleSelect</h2>
<div style={{flexShrink: 0}}>
  <MultipleSelect/>
</div>

<h2>NativeSelects</h2>
<div style={{flexShrink: 0}}>
  <NativeSelects/>
</div>

<h2>SimpleSelect</h2>
<div style={{flexShrink: 0}}>
  <SimpleSelect/>
</div>

</div>

export default App
