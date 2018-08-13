
import React from 'react';

import AlertDialog from './AlertDialog'
import AlertDialogSlide from './AlertDialogSlide'
import ConfirmationDialog from './ConfirmationDialog'
import FormDialog from './FormDialog'
import FullScreenDialog from './FullScreenDialog'
import ScrollDialog from './ScrollDialog'
import SimpleDialog from './SimpleDialog'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>AlertDialog</h2>
<div style={{flexShrink: 0}}>
  <AlertDialog/>
</div>

<h2>AlertDialogSlide</h2>
<div style={{flexShrink: 0}}>
  <AlertDialogSlide/>
</div>

<h2>ConfirmationDialog</h2>
<div style={{flexShrink: 0}}>
  <ConfirmationDialog/>
</div>

<h2>FormDialog</h2>
<div style={{flexShrink: 0}}>
  <FormDialog/>
</div>

<h2>FullScreenDialog</h2>
<div style={{flexShrink: 0}}>
  <FullScreenDialog/>
</div>

<h2>ScrollDialog</h2>
<div style={{flexShrink: 0}}>
  <ScrollDialog/>
</div>

<h2>SimpleDialog</h2>
<div style={{flexShrink: 0}}>
  <SimpleDialog/>
</div>

</div>

export default App
