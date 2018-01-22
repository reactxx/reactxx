//import { AnimationLow } from '../common/index'
//import { sheetToClassSheet, keyFrameToClassNames } from 'muix-styles/web'
//export { getAnimations } from '../common/index'

//export class AnimationDriver<T extends Animation.AnimationShape> extends AnimationLow<T> implements Animation.AnimationWeb<T> {
//  constructor(sheet: Animation.AnimationX<T>, public statefullComponent: React.Component) {
//    super(sheet, statefullComponent)
//    const { $delay, $duration, $easing, $opened, ...rest } = sheet as Animation.AnimationX<{}>
//    const config = {
//      transitionDuration: `${$duration || 1000}ms`,
//      transitionTimingFunction: $easing || 'ease-in',
//      transitionDelay: `${$delay || 0}ms`,
//    }
//    const animationConfig = ` ${$duration || 1000}ms ${$easing || 'ease-in'} ${$delay || 0 }ms running`

//    //const rulesets0 = { ...config }, rulesets1 = { ...config}
//    this.bothClassName = [{} as any, {} as any]
//    for (const propsName in rest) {
//      if (propsName.startsWith('$')) continue
//      const pairs: Animation.RuleSetX<ReactN.TextProperties> = rest[propsName]
//      const transformPairs = pairs.transform

//      const rulesets: Muix.CSSPropertiesWeb[] = [{}, {}], keyFrames: [number, string, any][] = [], transforms = ['', ''], range = [0, 1]

//      const addTransformString = pair => range.forEach(idx => rulesets[idx]['transform'] = pair[idx])
//      const addTransformProp = (pair, propName) => {
//        const px = pixTransforms[propName] ? 'px' : ''
//        range.forEach(idx => transforms[idx] += `${propName}(${pair[idx]}${px})`)
//      }
//      const addProp = (pair, propName) => range.forEach(idx => rulesets[idx][propName] = pair[idx])

//      const addKeyFrame = (pair, propName, getRule: (frame, propName, value) => [number, string, any]) => { //e.g. pair=[ 99, 1000, '0.2=200,0.7=700'], propName='translateX'
//        const more: string = pair[2]
//        const mores = more.split(',').map(p => p.trim().split('=').map((v, idx) => idx == 0 ? parseFloat(v.trim()) : v.trim()))
//        const frameValues = [[0, pair[0]], ...mores, [1, pair[1]]] //e.g. [[0, 99], [0.2, 200], [0.7, 700], [1, 1000]]
//        frameValues.forEach(nv => keyFrames.push(getRule(nv[0], propName, nv[1]))) //add e.g. [0.7, 'transform', 'translate(700px)']
//      }
//      const getKeyFrameRule = (frame: number, propName, value) => [frame, propName, value] as [number, string, any]
//      const getKeyFrameTransformRule = (frame: number, propName, value) => [frame, 'transform', `${propName}(${value}${pixTransforms[propName] ? 'px' : ''})`] as [number, string, any]

//      for (const propName in pairs) {
//        if (propName.startsWith('$')) continue
//        const pair = pairs[propName]
//        if (pair === transformPairs) {
//          if (typeof transformPairs[0] === 'string') //e.g. transform: ['translateX(-200px) scale(0)', 'translateX(0px) scale(1)']
//            addTransformString(transformPairs)
//          else { //e.g. transform: [ { translateX: [-200, 0] }, { scale: [0, 1] }, ]
//            transformPairs.forEach(pairs2 => {
//              for (const propName2 in pairs2) {
//                const pair2 = pairs2[propName2]
//                if (pair2.length == 3) // e.g. translateX: [-5000, 0, '0.01=0']
//                  addKeyFrame(pair2, propName2, getKeyFrameTransformRule)
//                else
//                  addTransformProp(pair2, propName2)
//              }
//            })
//            addTransformString(transforms)
//          }
//        } else if (pair.length == 3) // e.g. opacity: [0, 1, '0.5=1']
//          addKeyFrame(pair, propName, getKeyFrameRule)
//        else //e.g. opacity: [0,1]
//          addProp(pair, propName)
//      }

//      //const keyFramesCSS = JSON.stringify(getKeyFrameObject(keyFrames),null,2)
//      //debugger


//      const keyFrameObjects = getKeyFrameObject(keyFrames)
//      const animation0 = keyFrameObjects ? { animation: keyFrameToClassNames(keyFrameObjects[0]) + animationConfig } : null
//      const animation1 = keyFrameObjects ? { animation: keyFrameToClassNames(keyFrameObjects[1]) + animationConfig } : null

//      //const ruleset0: Muix.CSSPropertiesWeb = {}, ruleset1: Muix.CSSPropertiesWeb = {}, 
//      //animatedRuleset(pairs, ruleset0, ruleset1, false, keyFrames, transformPairs)
//      //if (transformPairs) {
//      //  let transform0 = '', transform1 = ''
//      //  if (typeof transformPairs[0] === 'string') { //inherits from $web, values are string already
//      //    transform0 = transformPairs[0] as string
//      //    transform1 = transformPairs[1] as string
//      //  } else { //convert transform object to string
//      //    transformPairs.forEach(pair => {
//      //      const r0 = {}; const r1 = {};
//      //      animatedRuleset(pair, r0, r1, true, keyFrames)
//      //      transform0 += r0['value'] + ' '
//      //      transform1 += r1['value'] + ' '
//      //    })
//      //  }
//      //  ruleset0['transform'] = transform0
//      //  ruleset1['transform'] = transform1
//      //}
//      const transitionProperty = Object.keys(rulesets[0]).join(', ') //all used animation keys (used for CSS rule "transition-property: <comma delimited property names>")
//      this.bothClassName[0][propsName] = { ...rulesets[0], ...config, transitionProperty, ...animation0 }
//      this.bothClassName[1][propsName] = { ...rulesets[1], ...config, transitionProperty, ...animation1 }

//    }
//    const x = JSON.stringify(this.bothClassName, null, 2)
//    debugger
//    this.sheet = this.bothClassName[$opened ? 1 : 0]
//  }
//  sheet: Animation.SheetWeb<T>
//  private bothClassName: Animation.SheetWeb<T>[]
//  doOpen(opened: boolean) {
//    this.sheet = this.bothClassName[opened ? 1 : 0]
//    this.statefullComponent.forceUpdate()
//  }
//}

//const getKeyFrameObject = (frames: [number, string, any][]) => {
//  if (frames.length == 0) return null
//  frames = frames.sort((a, b) => a[0] - b[0])
//  const res0 = {}, res1 = {}
//  let lastRule, lastIdx = -1
//  frames.forEach(rule => {
//    const frame = rule[0]
//    if (frame < 0 || frame > 1 || rule[0] < lastIdx) return //error
//    if (frame > lastIdx) {
//      res1[`${frame * 100}%`] = lastRule = {}
//      res0[`${(1 - frame) * 100}%`] = lastRule
//    }
//    lastIdx = frame
//    if (lastRule['transform'] && rule[1] == 'transform') lastRule['transform'] += ', ' + rule[2]
//    else lastRule[rule[1]] = rule[2]
//  })
//  return [res0, res1]
//}

////const animatedRuleset = (ruleset, r0, r1, inTransform: boolean, keyFrames, ignoredProp?) => {
////  for (const propName in ruleset) {
////    if (propName.startsWith('$')) continue
////    const pair = ruleset[propName]
////    if (pair === ignoredProp) continue
////    if (pair.length == 3) { //convert to keyframe
////    } else {
////      if (inTransform) {
////        const px = pixTransforms[propName] ? 'px' : ''
////        r0.value = `${propName}(${pair[0]}${px})`
////        r1.value = `${propName}(${pair[1]}${px})`
////      } else {
////        r0[propName] = pair[0]
////        r1[propName] = pair[1]
////      }
////    }
////  }
////}
//const pixTransforms = { translateX: true, translateY: true }

