
import React from 'react';

import DotsMobileStepper from './DotsMobileStepper'
import HorizontalLinearAlternativeLabelStepper from './HorizontalLinearAlternativeLabelStepper'
import HorizontalLinearStepper from './HorizontalLinearStepper'
import HorizontalNonLinearAlternativeLabelStepper from './HorizontalNonLinearAlternativeLabelStepper'
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper'
import HorizontalNonLinearStepperWithError from './HorizontalNonLinearStepperWithError'
import ProgressMobileStepper from './ProgressMobileStepper'
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper'
import TextMobileStepper from './TextMobileStepper'
import VerticalLinearStepper from './VerticalLinearStepper'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>DotsMobileStepper</h2>
<div style={{flexShrink: 0}}>
  <DotsMobileStepper/>
</div>

<h2>HorizontalLinearAlternativeLabelStepper</h2>
<div style={{flexShrink: 0}}>
  <HorizontalLinearAlternativeLabelStepper/>
</div>

<h2>HorizontalLinearStepper</h2>
<div style={{flexShrink: 0}}>
  <HorizontalLinearStepper/>
</div>

<h2>HorizontalNonLinearAlternativeLabelStepper</h2>
<div style={{flexShrink: 0}}>
  <HorizontalNonLinearAlternativeLabelStepper/>
</div>

<h2>HorizontalNonLinearStepper</h2>
<div style={{flexShrink: 0}}>
  <HorizontalNonLinearStepper/>
</div>

<h2>HorizontalNonLinearStepperWithError</h2>
<div style={{flexShrink: 0}}>
  <HorizontalNonLinearStepperWithError/>
</div>

<h2>ProgressMobileStepper</h2>
<div style={{flexShrink: 0}}>
  <ProgressMobileStepper/>
</div>

<h2>SwipeableTextMobileStepper</h2>
<div style={{flexShrink: 0}}>
  <SwipeableTextMobileStepper/>
</div>

<h2>TextMobileStepper</h2>
<div style={{flexShrink: 0}}>
  <TextMobileStepper/>
</div>

<h2>VerticalLinearStepper</h2>
<div style={{flexShrink: 0}}>
  <VerticalLinearStepper/>
</div>

</div>

export default App
