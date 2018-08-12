
import React from 'react';

import ButtonBases from './ButtonBases'
import ButtonSizes from './ButtonSizes'
import ContainedButtons from './ContainedButtons'
import CustomizedButtons from './CustomizedButtons'
import FloatingActionButtons from './FloatingActionButtons'
import FloatingActionButtonZoom from './FloatingActionButtonZoom'
import IconButtons from './IconButtons'
import IconLabelButtons from './IconLabelButtons'
import OutlinedButtons from './OutlinedButtons'
import TextButtons from './TextButtons'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ButtonBases</h2>
<div style={{flexShrink: 0}}>
  <ButtonBases/>
</div>

<h2>ButtonSizes</h2>
<div style={{flexShrink: 0}}>
  <ButtonSizes/>
</div>

<h2>ContainedButtons</h2>
<div style={{flexShrink: 0}}>
  <ContainedButtons/>
</div>

<h2>CustomizedButtons</h2>
<div style={{flexShrink: 0}}>
  <CustomizedButtons/>
</div>

<h2>FloatingActionButtons</h2>
<div style={{flexShrink: 0}}>
  <FloatingActionButtons/>
</div>

<h2>FloatingActionButtonZoom</h2>
<div style={{flexShrink: 0}}>
  <FloatingActionButtonZoom/>
</div>

<h2>IconButtons</h2>
<div style={{flexShrink: 0}}>
  <IconButtons/>
</div>

<h2>IconLabelButtons</h2>
<div style={{flexShrink: 0}}>
  <IconLabelButtons/>
</div>

<h2>OutlinedButtons</h2>
<div style={{flexShrink: 0}}>
  <OutlinedButtons/>
</div>

<h2>TextButtons</h2>
<div style={{flexShrink: 0}}>
  <TextButtons/>
</div>

</div>

export default App
