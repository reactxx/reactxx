# reactxx-mdi
MDI essentials for both react and react-native (based on https://materialdesignicons.com/)


## For web

### using import
```javascript
import React from 'react'
import { Play } from 'reactxx-mdi/Play'

const App = props => <svg><path d={Play} /></svg>
export default App
```

### using Typescript ```const enum {...}``` (no import)
```typescript
import React from 'react'

const App = props => <svg><path d={MDI.Play} /></svg>
export default App
```

## For native (using Expo)

### using import
```javascript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Play } from 'reactxx-mdi/Play'

const App = props => <MaterialCommunityIcons name={Play}/>
export default App
```

### using Typescript ```const enum {...}``` (no import)
```typescript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const App = props => <MaterialCommunityIcons name={MDI.Play}/>
export default App
```