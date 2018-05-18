import React from 'react'
import ReactN, { View, TouchableWithoutFeedback, Animated, Easing, Platform, LayoutRectangle } from 'react-native'
import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
import { Properties } from 'csstype'

import { TCommonStyles, mergeRulesets, TCommon } from 'reactxx-basic'
import { Types, TAddIn, TProvider, withStylesCreator } from 'reactxx'

import { MuiButtonBaseT } from '../../typings/button-base'
import { Muix } from '../../typings/muix'

const sheet: Types.SheetCreatorX<MuiButtonBaseT.Shape> = ({ palette }) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    $native: {}
    //backgroundColor: palette.common.white,
    //opacity: 0.35,

  },

})

const minRippleSize = 0.01

export class RippleEffect extends React.Component<MuiButtonBaseT.RippleEfectProps> {

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

  onPressedIn = () => this.setState({ active: true })
  onPressedOut = () => this.setState({ active: false })

  render() {
    const { scaleValue, opacityValue, onPressedIn, onPressedOut, rect: { width, height }, state: { active }, props: { system: { theme, style }, onPress, children, viewStyle, rippleStyle, activeStyle, disabled, disableRipple } } = this

    const renderRipple = () => {

      if (disabled || disableRipple || !width || !height || typeof active == 'undefined') return null

      const radius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))

      const style = {
        ...rippleStyle as ReactN.ViewStyle,
        position: 'absolute',
        left: -(radius - width / 2),
        top: - (radius - height / 2),
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        transform: [{ scale: scaleValue as any }],
        opacity: opacityValue as any,
      } as ReactN.ViewStyle

      //console.log('renderRipple', style)

      return <Animated.View style={style} />
    }

    if (active === true) {
      this.clear()
      opacityValue.setValue(rippleStyle.opacity)
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

    return <TouchableWithoutFeedback disabled={disabled} onPress={onPress} onPressIn={onPressedIn} onPressOut={onPressedOut} onLayout={({ nativeEvent: { layout } }) => this.rect = layout} >
      <View style={Object.assign({}, viewStyle, style, false/*active*/ ? activeStyle : null)}>
        {renderRipple()}
        {children}
      </View>
    </TouchableWithoutFeedback>
  }

}

const buttonBase: Types.CodeSFCNative<MuiButtonBaseT.Shape> = props => {
  const { system: { style, classes, animations }, ...rest } = props
  const viewStyle = mergeRulesets<'View'>(classes.root)
  const rippleStyle = mergeRulesets<'View'>(classes.ripple)
  return <RippleEffect viewStyle={viewStyle} rippleStyle={rippleStyle} activeStyle={{}} {...rest} />
}

const ButtonBase = withStylesCreator<MuiButtonBaseT.Shape>(MuiButtonBaseT.CompNames.ButtonBase, sheet, buttonBase)()

export default ButtonBase