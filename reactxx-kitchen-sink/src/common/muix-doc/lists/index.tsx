
import React from 'react';

import CheckboxList from './CheckboxList'
import CheckboxListSecondary from './CheckboxListSecondary'
import FolderList from './FolderList'
import InsetList from './InsetList'
import InteractiveList from './InteractiveList'
import NestedList from './NestedList'
import PinnedSubheaderList from './PinnedSubheaderList'
import SelectedListItem from './SelectedListItem'
import SimpleList from './SimpleList'
import SwitchListSecondary from './SwitchListSecondary'

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  <h2>CheckboxList</h2>
<div style={{flexShrink: 0}}>
  <CheckboxList/>
</div>

<h2>CheckboxListSecondary</h2>
<div style={{flexShrink: 0}}>
  <CheckboxListSecondary/>
</div>

<h2>FolderList</h2>
<div style={{flexShrink: 0}}>
  <FolderList/>
</div>

<h2>InsetList</h2>
<div style={{flexShrink: 0}}>
  <InsetList/>
</div>

<h2>InteractiveList</h2>
<div style={{flexShrink: 0}}>
  <InteractiveList/>
</div>

<h2>NestedList</h2>
<div style={{flexShrink: 0}}>
  <NestedList/>
</div>

<h2>PinnedSubheaderList</h2>
<div style={{flexShrink: 0}}>
  <PinnedSubheaderList/>
</div>

<h2>SelectedListItem</h2>
<div style={{flexShrink: 0}}>
  <SelectedListItem/>
</div>

<h2>SimpleList</h2>
<div style={{flexShrink: 0}}>
  <SimpleList/>
</div>

<h2>SwitchListSecondary</h2>
<div style={{flexShrink: 0}}>
  <SwitchListSecondary/>
</div>

</div>

export default App
