import * as Sheeter from 'reactxx-sheeter';
import { DriverLow } from '../common/animation';



export class Driver extends DriverLow {

  constructor(sheet: Sheeter.WebAnimationAddIn, name: string, component) {
    super(sheet, name, component)
    // console.log(JSON.stringify(sheet, null, 2))
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
    this.$pars.opened = opened
    this.refreshRulesets()
    this.runningTimer = window.setTimeout(() => {
      delete this.runningTimer
    }, $delay + $duration)
    this.$pars.component.setState({})
  }

  refreshRulesets() {
    const openFlag = this.$pars.opened ? '/opened' : '/closed' 
    this.$pars.rulesetNames.forEach(rulesetName => this[rulesetName] = this.$pars.sheet[rulesetName + openFlag])
  }
}

const pixTransforms = { translateX: true, translateY: true }

