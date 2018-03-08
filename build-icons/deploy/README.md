# reactxx-mdi
MDI essentials for both react and react-native (based on https://materialdesignicons.com/)


## For web
```typescript
import React from 'react'
import { Play } from 'reactxx-mdi/Play'

const App = props => <svg><path d={Play} /></svg>
export default App
```

## For web
```typescript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Play } from 'reactxx-mdi/Play'

const App = props => <MaterialCommunityIcons name={Play}/>
export default App
