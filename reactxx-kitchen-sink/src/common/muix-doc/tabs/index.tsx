
import React from 'react';

import CenteredTabs from './CenteredTabs'
import CustomizedTabs from './CustomizedTabs'
import DisabledTabs from './DisabledTabs'
import FullWidthTabs from './FullWidthTabs'
import IconLabelTabs from './IconLabelTabs'
import IconTabs from './IconTabs'
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'
import ScrollableTabsButtonForce from './ScrollableTabsButtonForce'
import ScrollableTabsButtonPrevent from './ScrollableTabsButtonPrevent'
import SimpleTabs from './SimpleTabs'
import TabsWrappedLabel from './TabsWrappedLabel'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>CenteredTabs</h2>
<div style={{flexShrink: 0}}>
  <CenteredTabs/>
</div>

<h2>CustomizedTabs</h2>
<div style={{flexShrink: 0}}>
  <CustomizedTabs/>
</div>

<h2>DisabledTabs</h2>
<div style={{flexShrink: 0}}>
  <DisabledTabs/>
</div>

<h2>FullWidthTabs</h2>
<div style={{flexShrink: 0}}>
  <FullWidthTabs/>
</div>

<h2>IconLabelTabs</h2>
<div style={{flexShrink: 0}}>
  <IconLabelTabs/>
</div>

<h2>IconTabs</h2>
<div style={{flexShrink: 0}}>
  <IconTabs/>
</div>

<h2>ScrollableTabsButtonAuto</h2>
<div style={{flexShrink: 0}}>
  <ScrollableTabsButtonAuto/>
</div>

<h2>ScrollableTabsButtonForce</h2>
<div style={{flexShrink: 0}}>
  <ScrollableTabsButtonForce/>
</div>

<h2>ScrollableTabsButtonPrevent</h2>
<div style={{flexShrink: 0}}>
  <ScrollableTabsButtonPrevent/>
</div>

<h2>SimpleTabs</h2>
<div style={{flexShrink: 0}}>
  <SimpleTabs/>
</div>

<h2>TabsWrappedLabel</h2>
<div style={{flexShrink: 0}}>
  <TabsWrappedLabel/>
</div>

</div>

export default App
