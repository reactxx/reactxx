
import React from 'react';

import ComposedTextField from './ComposedTextField'
import CustomizedInputs from './CustomizedInputs'
import FormattedInputs from './FormattedInputs'
import InputAdornments from './InputAdornments'
import Inputs from './Inputs'
import InputWithIcon from './InputWithIcon'
import TextFieldMargins from './TextFieldMargins'
import TextFields from './TextFields'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ComposedTextField</h2>
<div style={{flexShrink: 0}}>
  <ComposedTextField/>
</div>

<h2>CustomizedInputs</h2>
<div style={{flexShrink: 0}}>
  <CustomizedInputs/>
</div>

<h2>FormattedInputs</h2>
<div style={{flexShrink: 0}}>
  <FormattedInputs/>
</div>

<h2>InputAdornments</h2>
<div style={{flexShrink: 0}}>
  <InputAdornments/>
</div>

<h2>Inputs</h2>
<div style={{flexShrink: 0}}>
  <Inputs/>
</div>

<h2>InputWithIcon</h2>
<div style={{flexShrink: 0}}>
  <InputWithIcon/>
</div>

<h2>TextFieldMargins</h2>
<div style={{flexShrink: 0}}>
  <TextFieldMargins/>
</div>

<h2>TextFields</h2>
<div style={{flexShrink: 0}}>
  <TextFields/>
</div>

</div>

export default App
