# muix
Feasibility study for React-Native material-ui

## Motivation
- with React and React Native, web app can share most of its logic with native iOS and Android apps, but the view layer needs to be implemented separately for each platform
- for my e-learning app I cannot find any UI framework capable of using single set of components for both web and native

## Why I draw inspiration from material-ui 1.0 (in beta)
- I 100% agree with oliviertassinari (co-creator of Material-UI) that ["option 3 - contract sharing"](https://github.com/mui-org/material-ui/issues/593#issuecomment-286855345) is the most promising solution for development cross platform UI framework
- material-ui uses ```CSS in JS``` styling solution, which is possible to be reused for native styling
- material-ui has great and powerfull theming and component customization
- material-ui has high quality open source codebase
- material-ui component coding methodology is applicable for native components too

## Primary aim of this project
**1. basic**
- [x] strong Typescript support
- [x] explore the possibility of single codebase (including single ```npm package``` format etc.) for web and native
- [x] to have common theming and styling for web and native (i.e. provide cross platform functionality contained in material-ui [styles](https://github.com/mui-org/material-ui/tree/v1-beta/src/styles) and [colors](https://github.com/mui-org/material-ui/tree/v1-beta/src/colors) directories)

**2. To have a few primitives (beyond material-ui content), alowing creation of cross platform *Hallo world* application**
- [x] [materialdesignicons.com](https://materialdesignicons.com/) icons (SVG for web, font icons for native)

*Following components do not realize their react-native functionality. It only allows to replace HTML ```<div>``` or ```<span>``` tags*
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
- [ ] document *single codebase* idea
- [ ] web and native examples for already finished components

## material-ui requests:
- ```export const jss = create(preset());``` in [withStyles.js](https://github.com/mui-org/material-ui/blob/v1-beta/src/styles/withStyles.js)
- functional ```classes``` attribute, see [9443](https://github.com/mui-org/material-ui/issues/9443)
- shadows: ```React.CSSProperties[]``` instead of ```string[]```, e.g. ```shadows[1] = {boxShadow: '...'}```
- Typography: ```Typography.fontWeightLight x Regular x Medium: React.CSSProperties``` instead of number, e.g. ```Typography.fontWeightLight = { fontSize: '400' }```
