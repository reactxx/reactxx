
import React from 'react';

import AdvancedGridList from './AdvancedGridList'
import ImageGridList from './ImageGridList'
import SingleLineGridList from './SingleLineGridList'
import TitlebarGridList from './TitlebarGridList'

const App: React.SFC = () => <div style={{ padding: 30, overflow: 'auto' }}>

  <h2>TitlebarGridList</h2>
  <div style={{ flexShrink: 0 }}>
    <TitlebarGridList />
  </div>

  <h2>AdvancedGridList</h2>
  <div style={{ flexShrink: 0 }}>
    <AdvancedGridList />
  </div>

  <h2>ImageGridList</h2>
  <div style={{ flexShrink: 0 }}>
    <ImageGridList />
  </div>

  <h2>SingleLineGridList</h2>
  <div style={{ flexShrink: 0 }}>
    <SingleLineGridList />
  </div>

</div>

export default App
