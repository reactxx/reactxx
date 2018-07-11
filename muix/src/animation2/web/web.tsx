import * as Sheeter from 'reactxx-sheeter';
import { DriverLow } from '../common/animation';



export class Driver extends DriverLow {

  constructor(sheet: Sheeter.NativeAnimationAddIn, public name: string, component) {
    super(sheet, name, component)
    this.refreshRulesets()
  }

  runningTimer: number
  reset() {
    if (!this.runningTimer) return
    clearTimeout(this.runningTimer)
    delete this.runningTimer
  }
  doOpen(opened: boolean) {
    const { $delay, $duration } = this.$config
    if (this.runningTimer) clearTimeout(this.runningTimer)
    this.opened = opened
    this.refreshRulesets()
    this.runningTimer = window.setTimeout(() => {
      delete this.runningTimer
    }, $delay + $duration)
    this.component.setState({})
  }

  refreshRulesets() {
    const openFlag = this.open ? '/opened' : '/closed' 
    this.rulesetNames.forEach(rulesetName => this[rulesetName] = this.sheet[rulesetName + openFlag])
  }
}

const pixTransforms = { translateX: true, translateY: true }

