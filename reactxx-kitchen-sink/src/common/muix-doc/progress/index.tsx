
import React from 'react';

import CircularDeterminate from './CircularDeterminate'
import CircularIndeterminate from './CircularIndeterminate'
import CircularIntegration from './CircularIntegration'
import CircularStatic from './CircularStatic'
import DelayingAppearance from './DelayingAppearance'
import LinearBuffer from './LinearBuffer'
import LinearDeterminate from './LinearDeterminate'
import LinearIndeterminate from './LinearIndeterminate'
import LinearQuery from './LinearQuery'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>CircularDeterminate</h2>
<div style={{flexShrink: 0}}>
  <CircularDeterminate/>
</div>

<h2>CircularIndeterminate</h2>
<div style={{flexShrink: 0}}>
  <CircularIndeterminate/>
</div>

<h2>CircularIntegration</h2>
<div style={{flexShrink: 0}}>
  <CircularIntegration/>
</div>

<h2>CircularStatic</h2>
<div style={{flexShrink: 0}}>
  <CircularStatic/>
</div>

<h2>DelayingAppearance</h2>
<div style={{flexShrink: 0}}>
  <DelayingAppearance/>
</div>

<h2>LinearBuffer</h2>
<div style={{flexShrink: 0}}>
  <LinearBuffer/>
</div>

<h2>LinearDeterminate</h2>
<div style={{flexShrink: 0}}>
  <LinearDeterminate/>
</div>

<h2>LinearIndeterminate</h2>
<div style={{flexShrink: 0}}>
  <LinearIndeterminate/>
</div>

<h2>LinearQuery</h2>
<div style={{flexShrink: 0}}>
  <LinearQuery/>
</div>

</div>

export default App
