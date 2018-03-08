### reactxx
Framework which enables creation of visual components for both react and react-native

Simple (not too much code), 
Current status: proof of concept.

Reactxx offers web x native platform agnostic:
- styling, component customization and theming
- simple declarative animation
- a few primitives components (view, text, icons, scrollView...)
- single project and single npm package for both web and native4

- idea
Reactxx helps to create visual components with common contract for web and native. So using such components produces 
Component source code vsak can be or common or different, depending on povaze komponenty.

- primitives

- styling
const ruleset = {
  marginTop:5,
  color: 'white',
  backgroundColor: 'blue'
}
works for both web and native

const ruleset = {
  marginTop:5,
  color: 'white',
  display: 'flex'
  $web: {
    display: 'inline',
    transform: ''
  },
  $native: {
    transform: [
      {scale: 0.5}
    ]
  }
}
works for both web and native too.

- theming and component customization (inspired by material-ui)

- single project and single npm package for both web and native
-- HOW: for native, expo packaging x for web SystemJS packaging for web

- animation

- 

- typescript


### reactxx-mui
- 

