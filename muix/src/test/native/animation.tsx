import * as React from 'react'
import ReactN from 'react-native'

import { Animated, Easing, Text, View } from 'react-native'

import { Muix } from 'reactxx-mui/typings/muix'

import { SheetsT } from 'reactxx-typings'

// ********** NATIVE

const AnimatedView: React.ComponentClass<ReactN.ViewProperties> = Animated.View

const rnValue = new Animated.Value(0)

const rnConfig = {
  duration: 2000, // milliseconds
  delay: 1000, // milliseconds
  easing: Easing.in(Easing.ease),
}

const rnInitValue: ReactN.ViewStyle = {
  transform: (rnValue => [{
    translateX: rnValue.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }) as any,
    translateY: rnValue.interpolate({ inputRange: [0, 1], outputRange: [0, 100] }) as any,
  }]) as any,
  opacity: (rnValue => rnValue.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })) as any,
}

const rnInitValue2: ReactN.ViewStyle = {
  opacity: (rnValue => rnValue.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })) as any,
}

class RNView extends React.PureComponent {
  state = { open: false }
  render() {
    rnValue.stopAnimation()
    Animated.timing(rnValue, { ...rnConfig, toValue: this.state.open ? 1 : 0 }).start() 
    return <View>
      <AnimatedView style={rnInitValue}>
        <Text>My Sliding Box</Text>
      </AnimatedView>
      <AnimatedView style={rnInitValue2}>
        <Text>My Sliding Box</Text>
      </AnimatedView>
    </View>
  }
}

// ********** WEB

interface ITransition {
  closedStyle(theme: Muix.Theme): React.CSSProperties
  openedStyle(theme: Muix.Theme): React.CSSProperties
  init(comp: React.Component, initOpened?: boolean)
  setOpened(isOpen?: boolean)
}

type Animation<T extends SheetsT.RulesetNative> = SheetsT.RulesetX<T> & { $easing?: string, $duration?: number, $delay?: number }

const transitionCreate = (par: (theme: Muix.Theme) => SheetsT.RulesetX<ReactN.ViewStyle> & { $easing?: string, $duration?: number, $delay?: number }) => null as ITransition

const transition1 = transitionCreate(
  theme => ({
    opacity: [0, 1] as any,
    backgroundColor: ['green', 'red'] as any,
    $web: {
      transform: ['translate(0px, 0px) scale(20) skew(-20deg)', 'translate(200px, 100px) scale(0) skew(0)'] as any
    },
    $native: {
      transform: [{
        translateX: [0, 200] as any,
        translateY: [0, 100] as any,
        scale: [20, 0] as any,
      }]
    },
    $easing: theme.transitions.easing.sharp,
    $duration: theme.transitions.duration.leavingScreen,
    $delay: 1
  })
)


const rClosed = (theme: Muix.Theme) => ({
  ...transition1.closedStyle(theme)
})
const rOpened = (theme: Muix.Theme) => ({
  ...transition1.openedStyle(theme)
})

const rInitValue2: React.CSSProperties = { opacity: 0, transitionProperty: 'opacity', }
const rTargetValue2: React.CSSProperties = { opacity: 1, }

let theme: Muix.Theme
const mui: React.CSSProperties = {

}

const rConfig: React.CSSProperties = {
  transitionDuration: '2s',
  transitionTimingFunction: 'ease-in',
  transitionDelay: '1s',
}

class RView extends React.PureComponent {
  render() {
    transition1.init(this)
    //transition1(this.state.open)
    return <div>
      <div style={{}}>
        <span>My Sliding Box</span>
      </div>
      <div style={[rInitValue2, rConfig, rTargetValue2]}>
        <span>My Sliding Box</span>
      </div>
    </div>
  }
}


