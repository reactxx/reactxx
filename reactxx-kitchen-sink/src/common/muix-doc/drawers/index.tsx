
import React from 'react';

import ClippedDrawer from './ClippedDrawer'
import MiniDrawer from './MiniDrawer'
import PermanentDrawer from './PermanentDrawer'
import PersistentDrawer from './PersistentDrawer'
import ResponsiveDrawer from './ResponsiveDrawer'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import TemporaryDrawer from './TemporaryDrawer'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ClippedDrawer</h2>
<div style={{flexShrink: 0}}>
  <ClippedDrawer/>
</div>

<h2>MiniDrawer</h2>
<div style={{flexShrink: 0}}>
  <MiniDrawer/>
</div>

<h2>PermanentDrawer</h2>
<div style={{flexShrink: 0}}>
  <PermanentDrawer/>
</div>

<h2>PersistentDrawer</h2>
<div style={{flexShrink: 0}}>
  <PersistentDrawer/>
</div>

<h2>ResponsiveDrawer</h2>
<div style={{flexShrink: 0}}>
  <ResponsiveDrawer/>
</div>

<h2>SwipeableTemporaryDrawer</h2>
<div style={{flexShrink: 0}}>
  <SwipeableTemporaryDrawer/>
</div>

<h2>TemporaryDrawer</h2>
<div style={{flexShrink: 0}}>
  <TemporaryDrawer/>
</div>

</div>

export default App
