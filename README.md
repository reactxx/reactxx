# muix
Feasibility study for React-Native version of material-ui

## Motivaton
- with React and React Native, web app can share most of its logic with native iOS and Android apps, but the view layer needs to be implemented separately for each platform
- for my e-learning app I cannot find any UI framework capable of using single set of components for both web and native


## Why material-ui 1.0 (in beta)
- I 100% agree with @oliviertassinari that [**"option 3 - contract sharing"**](https://github.com/mui-org/material-ui/issues/593#issuecomment-286855345) is the most promising solution for development cross platform UI framework
- material-ui uses ```CSS in JS``` styling solution, which is possible to reuse for native styling
- material-ui has great and most powerfull theming and component customization
- material-ui has high quality open source codebase
- material-ui component coding methodology is applicable for native components too



## To solve
- cross platform animation

### material-ui requests:
- exports ```jss``` const
- functional ```classes``` attribute
- shadows: React.CSSProperties[]
- ```Typography.fontWeightLight x Regular x Medium```: React.CSSProperties
