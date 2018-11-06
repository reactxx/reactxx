import { Animated } from 'react-native';
import { DriverLow } from '../common/animation';
import * as Sheeter from 'reactxx-sheeter';


export class Driver extends DriverLow {

  constructor(sheet: Sheeter.NativeAnimationAddIn, name: string, component) {
    super(sheet, name, component)
    this.$pars.rulesetNames.forEach(rulesetName => {
      const ruleset =sheet[rulesetName] 
      const res = this[rulesetName] = {}
      for (const ruleName in ruleset) {
        if (ruleName==='transform') {
          const transformRule = ruleset[ruleName] as Sheeter.InterpolationConfigTypes
          const transform = res[ruleName] = []
          for(const transformName in transformRule)
            transform.push({[transformName]: this.value.interpolate(transformRule[transformName])})
        } else
          res[ruleName] = this.value.interpolate(ruleset[ruleName])
      }
    })
  }

  value = new Animated.Value(this.$config.$opened ? 1 : 0)

  reset() {
    this.value.stopAnimation(); this.value.setValue(this.$pars.opened ? 1 : 0)
  }
  doOpen(toOpened: boolean) {
    const { value, $config } = this
    this.$pars.opened = toOpened
    Animated.timing(value, { duration: $config.$duration, delay: $config.$delay, toValue: toOpened ? 1 : 0, useNativeDriver: $config.useNativeDriver }).start(({ finished }) => {
      if (!finished) return
      this.$pars.component.setState({})
    })

  }
}
