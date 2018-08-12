
import React from 'react';

import ConsecutiveSnackbars from './ConsecutiveSnackbars'
import DirectionSnackbar from './DirectionSnackbar'
import FabIntegrationSnackbar from './FabIntegrationSnackbar'
import FadeSnackbar from './FadeSnackbar'
import LongTextSnackbar from './LongTextSnackbar'
import PositionedSnackbar from './PositionedSnackbar'
import SimpleSnackbar from './SimpleSnackbar'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ConsecutiveSnackbars</h2>
<div style={{flexShrink: 0}}>
  <ConsecutiveSnackbars/>
</div>

<h2>DirectionSnackbar</h2>
<div style={{flexShrink: 0}}>
  <DirectionSnackbar/>
</div>

<h2>FabIntegrationSnackbar</h2>
<div style={{flexShrink: 0}}>
  <FabIntegrationSnackbar/>
</div>

<h2>FadeSnackbar</h2>
<div style={{flexShrink: 0}}>
  <FadeSnackbar/>
</div>

<h2>LongTextSnackbar</h2>
<div style={{flexShrink: 0}}>
  <LongTextSnackbar/>
</div>

<h2>PositionedSnackbar</h2>
<div style={{flexShrink: 0}}>
  <PositionedSnackbar/>
</div>

<h2>SimpleSnackbar</h2>
<div style={{flexShrink: 0}}>
  <SimpleSnackbar/>
</div>

</div>

export default App
