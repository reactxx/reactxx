import React from 'react'
import ReactN from 'react-native'

import { View, TouchableWithoutFeedback, Animated, Easing, Platform, Text, LayoutRectangle } from 'react-native';

import { sheetCreator, withStyles, classNames } from 'muix-styles'

const sheet = sheetCreator<MuixButtonBase.Shape>(({ palette }) => ({
  common: {
    root: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  native: {
    ripple: {
      backgroundColor: palette.common.white,
      opacity: 0.35,
    },
  },
  web: {}
}))

const minRippleSize = 0.01

export class buttonBase<R extends MuixButtonBase.Shape> extends React.Component<Muix.CodePropsNative<R> & Muix.CodePropsNative<MuixButtonBase.Shape>> {

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

  doRender(children: React.ReactNode, ripple: ReactN.ViewStyle) {
    const { scaleValue, opacityValue, onPressedIn, onPressedOut, rect: { width, height }, state: { active }, props: { style, disabled, onPress, classes, theme, innerRef, disableRipple } } = this
    if (!ripple) ripple = classes.ripple

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
        //http://xaedes.de/dev/transitions/
        //http://cubic-bezier.com
        easing: Easing.linear,
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
    //let x: Muix.CodePropsNative<MuixButtonBase.Shape>['classes']
    return classNames<ReactN.ViewStyle>(
      classes.root,
      style,
    )
  }

  render() {
    const { props: { classes: { ripple }, children }} = this
    return this.doRender(children, ripple)
  }
}

//let y: Muix.getCommon<MuixButtonBase.Shape>

const ButtonBase = withStyles<MuixButtonBase.Shape>(sheet, { name: 'MuiButtonBase' })(buttonBase)

export default ButtonBase