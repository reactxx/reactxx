import { Sheets, Sheet, getGaps } from '../index'

export const $animationsToCSS = ($animations: Sheets) => {
  for (const sheetName in $animations) {
    const sheet = $animations[sheetName]
    const { $delay = 0, $duration = 0, $easing = 'ease-in' } = sheet
    $animations[sheetName] = sheetToCSS(sheet, $duration as number, $delay as number, $easing as string)
  }
}

const sheetToCSS = (inputSheet: Sheet, $duration: number, $delay: number, $easing:string) => { 
  const outputSheet: Sheet = {}
  for (const rulesetName in inputSheet) {
    if (rulesetName.startsWith('$')) continue
    const ruleset = inputSheet[rulesetName]
    const transformRule = ruleset.transform

    const rulesets: [{}, {}] = [{}, {}]
    const transforms = ['', '']
    const range = [0, 1]
    const transitions0 = []
    const transitions1 = []

    const addTransformString = (transforms, modifier: string) => {
      range.forEach(idx => rulesets[idx]['transform'] = transforms[idx])
      setTransition('transform', modifier)
    }
    const addTransform = (transform, transformName: string) => {
      const px = pixTransforms[transformName] ? 'px' : ''
      range.forEach(idx => transforms[idx] += ` ${transformName}(${transform[idx]}${px})`)
    }
    const addRule = (rule, ruleName: string, modifier: string) => {
      range.forEach(idx => rulesets[idx][ruleName] = rule[idx])
      setTransition(ruleName, modifier)
    }
    const setTransition = (propName: string, modifier: string) => {
      let { leftGap, rightGap, duration } = getGaps(modifier, $duration)
      leftGap += $delay; rightGap += $delay
      transitions0.push(`${propName} ${duration}ms${rightGap ? ` ${rightGap}ms` : ''}`)
      transitions1.push(`${propName} ${duration}ms${leftGap ? ` ${leftGap}ms` : ''}`)
    }

    for (const ruleName in ruleset) {
      if (ruleName.startsWith('$')) continue
      const rule = ruleset[ruleName]
      if (rule === transformRule) { // transform
        if (typeof transformRule[0] === 'string') //e.g. transform: ['translateX(-200px) scale(0)', 'translateX(0px) scale(1)']
          addTransformString(transformRule, null)
        else { //e.g. transform: [ { translateX: [-200, 0] }, { scale: [0, 1] }, '30-50']
          const modifier = transformRule.time
          for (const transformName in transformRule) {
            const transform = transformRule[transformName]
            if (typeof transform === 'string') continue
            addTransform(transform, transformName)
          }
          addTransformString(transforms, modifier)
        }
      } else //e.g. opacity: [0,1]
        addRule(rule, ruleName, rule[2])
    }
    outputSheet[`${rulesetName}/opened`] = { ...rulesets[0], transitionTimingFunction: $easing, transition: transitions0.join(', ') }
    outputSheet[`${rulesetName}/closed`] = { ...rulesets[1], transitionTimingFunction: $easing, transition: transitions1.join(', ') }
  }
  //const x = JSON.stringify(outputSheet, null, 2)
  //debugger
  return outputSheet as Sheet
}

const pixTransforms = { translateX: true, translateY: true }

