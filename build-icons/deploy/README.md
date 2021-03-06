# reactxx-mdi
**Material Design Icons** essentials for both react and react-native (based on https://materialdesignicons.com/)


## Installation

```npm install reactxx-mdi --save```

reactxx-mdi is common npm package for both EXPO react-native project and react web project

## Web use case 

### using import
```javascript
import React from 'react'
import { Play } from 'reactxx-mdi/Play'

const App = props => <svg><path d={Play} /></svg>
export default App
```

### using Typescript's ```const enum MDI``` (no import)
```typescript
import React from 'react'

const App = props => <svg><path d={MDI.Play} /></svg>
export default App
```

## EXPO use case 

### using import
```javascript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Play } from 'reactxx-mdi/Play'

const App = props => <MaterialCommunityIcons name={Play}/>
export default App
```

### using Typescript's ```const enum MDI``` (no import)
```typescript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const App = props => <MaterialCommunityIcons name={MDI.Play}/>
export default App
```
