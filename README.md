# ReactXX

Framework which enables creation of visual components for both **react** and **react-native**

*Notice: the whole project is in **proof of concept** stage*

## reactxx-kitchen-sink examples
Web and native code of all examples differs only in a few lines in root index.tsx's (see [native](https://github.com/reactxx/reactxx/blob/master/reactxx-kitchen-sink/src/native/index.tsx) and [web](https://github.com/reactxx/reactxx/blob/master/reactxx-kitchen-sink/src/web/index.tsx) versions)

- **ResponsibleDrawer component: [FOR WEB](https://codesandbox.io/embed/github/PavelPZ/reactxx/tree/master/reactxx-kitchen-sink?codemirror=1&fontsize=12&module=%2Fsrc%2Fcommon%2Fresponsible-drawer%2Fresponsible-drawer.tsx&view=preview) | [FOR NATIVE (EXPO)](https://expo.io/@pzika/reactxx-kitchen-sink)**

## Helper packages

- [reactxx-mdi](https://github.com/reactxx/reactxx/tree/master/build-icons) - Material Design Icons essentials for both react and react-native
- [reactxx-stateman](https://github.com/reactxx/reactxx/tree/master/muix/src/stateman) - state manager inspired by react 16.3 context api
- [reactxx-mui](https://github.com/reactxx/reactxx/tree/master/muix/src/mui) - bridge to material-ui which enables creation of native components, compatible with material-ui

## TODO

- [ ] more reactxx-kitchen-sink examples
- [ ] split reactxx-mui into two packages: reactxx-mui-bridge and reactxx-mui-components
- [ ] create reactxx-mui-kitchen-sink projects with web and native material-ui's compatible component examples
- [ ] move CSS in JS animation extension to helper package
- [ ] move CSS in JS media query extension to helper package
- [ ] documentation
- [x] create reactxx-kitchen-sink projects for web and native with ResponsibleDrawer component example
- [x] simple primitives (Text, View, Icon, ScrollView, AnimatedText, AnimatedView, AnimatedIcon, AnimatedScrollView)
- [x] theming and component customization
- [x] single project and package.json for web and native
- [x] format of NPM package which is common for web and native

