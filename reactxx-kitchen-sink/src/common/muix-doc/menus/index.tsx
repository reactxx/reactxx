
import React from 'react';

import FadeMenu from './FadeMenu'
import ListItemComposition from './ListItemComposition'
import LongMenu from './LongMenu'
import MenuListComposition from './MenuListComposition'
import RenderPropsMenu from './RenderPropsMenu'
import SimpleListMenu from './SimpleListMenu'
import SimpleMenu from './SimpleMenu'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>FadeMenu</h2>
<div style={{flexShrink: 0}}>
  <FadeMenu/>
</div>

<h2>ListItemComposition</h2>
<div style={{flexShrink: 0}}>
  <ListItemComposition/>
</div>

<h2>LongMenu</h2>
<div style={{flexShrink: 0}}>
  <LongMenu/>
</div>

<h2>MenuListComposition</h2>
<div style={{flexShrink: 0}}>
  <MenuListComposition/>
</div>

<h2>RenderPropsMenu</h2>
<div style={{flexShrink: 0}}>
  <RenderPropsMenu/>
</div>

<h2>SimpleListMenu</h2>
<div style={{flexShrink: 0}}>
  <SimpleListMenu/>
</div>

<h2>SimpleMenu</h2>
<div style={{flexShrink: 0}}>
  <SimpleMenu/>
</div>

</div>

export default App
