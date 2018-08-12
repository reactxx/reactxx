
import React from 'react';

import MediaControlCard from './MediaControlCard'
import RecipeReviewCard from './RecipeReviewCard'
import SimpleCard from './SimpleCard'
import SimpleMediaCard from './SimpleMediaCard'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>MediaControlCard</h2>
<div style={{flexShrink: 0}}>
  <MediaControlCard/>
</div>

<h2>RecipeReviewCard</h2>
<div style={{flexShrink: 0}}>
  <RecipeReviewCard/>
</div>

<h2>SimpleCard</h2>
<div style={{flexShrink: 0}}>
  <SimpleCard/>
</div>

<h2>SimpleMediaCard</h2>
<div style={{flexShrink: 0}}>
  <SimpleMediaCard/>
</div>

</div>

export default App
