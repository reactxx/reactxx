
import React from 'react';

import IconAvatars from './IconAvatars'
import ImageAvatars from './ImageAvatars'
import LetterAvatars from './LetterAvatars'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>IconAvatars</h2>
<div style={{flexShrink: 0}}>
  <IconAvatars/>
</div>

<h2>ImageAvatars</h2>
<div style={{flexShrink: 0}}>
  <ImageAvatars/>
</div>

<h2>LetterAvatars</h2>
<div style={{flexShrink: 0}}>
  <LetterAvatars/>
</div>

</div>

export default App
