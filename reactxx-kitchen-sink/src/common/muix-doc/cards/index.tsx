
import React from 'react';

import ImgMediaCard from './ImgMediaCard'
import MediaCard from './MediaCard'
import MediaControlCard from './MediaControlCard'
import RecipeReviewCard from './RecipeReviewCard'
import SimpleCard from './SimpleCard'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>ImgMediaCard</h2>
<div style={{flexShrink: 0}}>
  <ImgMediaCard/>
</div>

<h2>MediaCard</h2>
<div style={{flexShrink: 0}}>
  <MediaCard/>
</div>

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

</div>

export default App
