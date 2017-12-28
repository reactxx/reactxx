import React from 'react'
import ReactN from 'react-native'
import { Shape } from '../../common/ButtonBase/ButtonBase'

import { View, TouchableWithoutFeedback, Animated, Easing, Platform, Text, LayoutRectangle } from 'react-native';

import { sheetCreator, withStyles, classNames } from 'muix-styles'

export type ButtonBaseShape = Shape

const sheet = sheetCreator<Shape>(({ palette }) => ({
  native: {
    ripple: {
      backgroundColor: palette.common.white,
      opacity: 0.35,
    },
    root: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  common: {},
  web: {}
}))

//const buttonBase: Mui.CodeSFCNative<Shape> = props => {
//  const {
//    classes,
//    style,
//    children,
//    disabled,
//    disableRipple,
//    onPress,
//    theme,
//    innerRef,
//    ...other
//  } = props

//  const actStyle = classNames<ReactN.ViewStyle>(
//    classes.root,
//    style,
//  )

//  let ripple: RippleEffect
//  let rect: LayoutRectangle
//  return <TouchableWithoutFeedback disabled={disabled} onPress={onPress} onPressIn={() => ripple && ripple.onPressedIn(rect)} onPressOut={() => ripple && ripple.onPressedOut()} onLayout={({ nativeEvent: { layout } }) => rect = layout} ref={div => innerRef && innerRef(div)} >
//    <View style={actStyle}>
//      {!disabled && !disableRipple && <RippleEffect theme={theme} style={classes.ripple} ref={rv => ripple = rv} />}
//      {children}
//    </View>
//  </TouchableWithoutFeedback>
//}

const minRippleSize = 0.01

export class buttonBase<R extends Shape> extends React.Component<Mui.CodePropsNative<R>> {

  state: { active?: boolean } = {}
  scaleValue = new Animated.Value(minRippleSize)
  opacityValue = new Animated.Value(0)
  scale: Animated.CompositeAnimation
  opacity: Animated.CompositeAnimation
  rect: Partial<LayoutRectangle> = {}

  clear() {
    const { scale, opacity } = this
    if (scale) scale.stop(); delete this.scale
    if (opacity) opacity.stop(); delete this.opacity
    this.scaleValue.setValue(minRippleSize);
    this.opacityValue.setValue(0);
  }

  onPressedIn = (() => this.setState({ active: true })).bind(this)
  onPressedOut = (() => this.setState({ active: false })).bind(this)

  doRender(children: React.ReactNode) {
    const { scaleValue, opacityValue, onPressedIn, onPressedOut, rect: { width, height }, state: { active }, props: { style, disabled, onPress, classes: { ripple }, theme, innerRef, disableRipple } } = this

    const renderRipple = () => {
      if (disabled || disableRipple || !width || !height || typeof active == 'undefined') return null

      const radius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))

      const style = {
        ...ripple,
        position: 'absolute',
        left: -(radius - width / 2),
        top: - (radius - height / 2),
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius, 
        transform: [{ scale: scaleValue as any }],
        opacity: opacityValue as any,
      } as ReactN.ViewStyle

      //console.log(radius, style, this.props)

      return <Animated.View style={style} />
    }

    if (active === true) {
      this.clear()
      opacityValue.setValue(ripple.opacity)
      this.scale = Animated.timing(scaleValue, {
        toValue: 1,
        duration: theme.transitions.duration.short,
        //easing: Easing.out(Easing.exp), 
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        useNativeDriver: Platform.OS === 'android',
      })
      this.scale.start()
    } else if (active === false) {
      this.opacity = Animated.timing(opacityValue, {
        duration: theme.transitions.duration.short,
        toValue: 0,
        useNativeDriver: Platform.OS === 'android',
      })
      this.opacity.start(() => this.clear())
    }

    return <TouchableWithoutFeedback disabled={disabled} onPress={onPress} onPressIn={onPressedIn} onPressOut={onPressedOut} onLayout={({ nativeEvent: { layout } }) => this.rect = layout} ref={div => innerRef && innerRef(div)} >
      <View style={this.getRootStyle()}>
        {renderRipple()}
        {children}
      </View>
    </TouchableWithoutFeedback>
  }

  getRootStyle() {
    const { props: { style, classes } } = this
    return classNames<ReactN.ViewStyle>(
      classes.root,
      style,
    )
  }

  render() {
    return this.doRender(this.props.children)
  }
}


//class RippleEffect extends React.PureComponent<{ style: ReactN.ViewStyle, theme: Mui.ThemeNew }> {
//  state: Partial<LayoutRectangle> = {}
//  scaleValue = new Animated.Value(0.01)
//  maxOpacity = this.props.style.opacity || 0.12
//  opacityValue = new Animated.Value(this.maxOpacity)
//  scale: Animated.CompositeAnimation
//  opacity: Animated.CompositeAnimation

//  clear() {
//    const { scale, opacity, maxOpacity } = this
//    if (scale) scale.stop(); delete this.scale
//    if (opacity) opacity.stop(); delete this.opacity
//    this.scaleValue.setValue(0.01);
//    this.opacityValue.setValue(maxOpacity);
//  }
//  onPressedIn(layout: LayoutRectangle) {
//    if (!layout) return
//    this.clear()
//    this.scale = Animated.timing(this.scaleValue, {
//      toValue: 1,
//      duration: this.props.theme.transitions.duration.short,
//      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
//      useNativeDriver: Platform.OS === 'android',
//    })
//    this.scale.start()
//    const { width, height } = layout
//    const { width: stWidth, height: stHeight } = this.state
//    if (width !== stWidth || height != stHeight) this.setState(layout)
//  }
//  onPressedOut() {
//    //console.log('onPressedOut')
//    this.opacity = Animated.timing(this.opacityValue, {
//      duration: this.props.theme.transitions.duration.short,
//      toValue: 0,
//      useNativeDriver: Platform.OS === 'android',
//    })
//    this.opacity.start(() => this.clear())
//  }
//  render() {
//    const { scaleValue, opacityValue, state: { width, height }, props: { style: st } } = this
//    if (!width || !height) return null
//    const radius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))

//    const style = {
//      ...st,
//      position: 'absolute',
//      left: -(radius - width / 2),
//      top: - (radius - height / 2),
//      width: radius * 2,
//      height: radius * 2,
//      borderRadius: radius,
//      transform: [{ scale: scaleValue }],
//      opacity: opacityValue,
//    }

//    //console.log(radius, style, this.props)

//    return <Animated.View style={style} />
//  }
//}

//const ButtonBase = withStyles<Shape>(sheet, { name: 'MuiButtonBase' })(buttonBase)
const ButtonBase = withStyles<Shape>(sheet, { name: 'MuiButtonBase' })(buttonBase)

//const b = <ButtonBase style={{}} onClick={null} />

//export default ButtonBase
export default ButtonBase