# reactxx-mdi
**Material Design Icons** essentials for both react and react-native (based on https://materialdesignicons.com/)


## Installation

```npm install reactxx-mdi --save```

reactxx-mdi is common npm package for both EXPO react-native project and react web project

## Web use case 

### using Typescript's ```const enum MDI```
Typescript replaces e.g. ```MDI.Close``` by its SVG value on **EVERY** MDI.Close's occurence.


```typescript
import React from 'react'
import MDI from 'reactxx-mdi'

const App = props => <svg><path d={MDI.Close} /></svg>
export default App
```

Transpiled Javascript ES6 code:

No ```import MDI from 'reactxx-mdi'``` is generated to Javascript 
```javascript
import React from 'react'

const App = props => <svg><path d={'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'} /></svg>
export default App
```

### using import
```typescript
import React from 'react'
import { Close } from 'reactxx-mdi/Close'

const App = props => <svg><path d={Close} /></svg>
export default App
```

Transpiled Javascript ES6 code:
```javascript
import React from 'react'
import { Close } from 'reactxx-mdi/Close'

const App = props => <svg><path d={Close} /></svg>
export default App
```

## EXPO use case 

### using Typescript's ```const enum MDI``` (no import)
```typescript
import React from 'react'
import MDI from 'reactxx-mdi'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const App = props => <MaterialCommunityIcons name={MDI.Close}/>
export default App
```

Transpiled Javascript ES6 code:

No ```import MDI from 'reactxx-mdi'``` is generated to Javascript 
```javascript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const App = props => <MaterialCommunityIcons name={'close'}/>
export default App
```

### using import
```typescript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Close } from 'reactxx-mdi/Play'

const App = props => <MaterialCommunityIcons name={Close}/>
export default App
```

Transpiled Javascript ES6 code:
```javascript
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Close } from 'reactxx-mdi/Play'

const App = props => <MaterialCommunityIcons name={Close}/>
export default App
```
