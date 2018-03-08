## styling

react + react-native: huge step towards the code sharing between web and native applications

problem with robust visual component framework.

react-native-web: philosophy
  prons x cons
reactxx philosofy
  prons x cons



react-native-web: low lewel 

Extensive set of common styling possibilities based on flex layout

const ruleset = {
  marginTop:5,
  color: 'white',
  backgroundColor: 'blue'
}

can be used or for span HTML 

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

