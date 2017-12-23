# muix
Tiny material-ui add-in which allows creation of material-ui compatible React-Native components

*Notice: whole project is in very early stage*

## Example

**Common application code**
```jsx
export const App = props => <View style={{ marginTop: 24 }}>
  <Button color='primary' raised classes={{label:{color: 'maroon'}}} onClick={ev => alert('Hallo Button')}>
    Hallo Button
  </Button> 
</View>
```

**Native app (powered by [EXPO](https://expo.io/))**
```js
import {App} from './root'
import Expo from 'expo'
Expo.registerRootComponent(app)
```

**Web app**
```js
import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './root'
ReactDOM.render(<App />, document.getElementById('content')) 
```

## Motivation
- with React and React Native, web app can share most of its logic with native iOS and Android apps, but the view layer needs to be implemented separately for each platform
- for my e-learning app I cannot find any UI framework capable of using single set of components for both web and native

## Why I draw inspiration from material-ui 1.0 (in beta)
- I 100% agree with oliviertassinari (co-creator of Material-UI) that ["option 3 - contract sharing"](https://github.com/mui-org/material-ui/issues/593#issuecomment-286855345) is the most promising solution for development cross platform UI framework
- material-ui uses ```CSS in JS``` styling solution, which can be reused for native styling too
- material-ui has great and powerfull theming and component customization
- material-ui has high quality open source codebase
- material-ui component coding methodology is applicable for native components too

## Primary aims of this project
**1. Basic**
- [x] to support Typescript (and redesign material-ui TS typing with respect of React Native)
- [x] to explore the possibility of single codebase (including single ```npm package``` format etc.) for web and native
- [x] to have common theming and styling for web and native (i.e. provide cross platform functionality contained in material-ui [styles](https://github.com/mui-org/material-ui/tree/v1-beta/src/styles) and [colors](https://github.com/mui-org/material-ui/tree/v1-beta/src/colors) directories)

**2. To have a few primitives (beyond material-ui), alowing creation of cross platform *Hallo world* application**
- [x] [materialdesignicons.com](https://materialdesignicons.com/) icons (SVG icons for web, font icons for native)

*The following components do not realize their react-native functionality. They only allows to replace HTML ```<div>``` or ```<span>``` tags by cross platform way*
- [x] View
- [ ] Text
- [ ] ScrollView

**3. To realize components which I need for my application:**
- [x] ButtonBase
- [x] Button
- [ ] IconButton
- [ ] AppBar
- [ ] Cards
- [ ] Drawers
- [ ] Papers

## TODO
- [ ] to document *single codebase* idea
- [ ] to document *common theming and styling for web and native* idea
- [ ] to create web and native examples for already finished components

## material-ui requests:
- ```export const jss = create(preset());``` in [withStyles.js](https://github.com/mui-org/material-ui/blob/v1-beta/src/styles/withStyles.js)
- functional ```classes``` attribute, see [9443](https://github.com/mui-org/material-ui/issues/9443)
- shadows: is arrai of React.CSSProperties instead of arrau of string, e.g. ```shadows[1] = {boxShadow: '...'}```
- Typography: ```Typography.fontWeightLight x Regular x Medium``` nas : React.CSSProperties type instead of number, e.g. ```Typography.fontWeightLight = { fontSize: '400' }```

## Limits:
- "textTransform: 'uppercase'" rule, e.g. for typography.button
- <Typography color='primary' classes={{root:{color:'blue'}}}>: for Native has "color='primary'" higher priority over classes.root. Solution: web atomic classes ala Fela
- <Text>{'\n'}</Text>