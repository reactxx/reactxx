import { TSheeter, TComponents, TCommonStyles, TAtomize } from 'reactxx-typings'
import { atomizeRuleset } from 'reactxx-sheeter'
import { T_Sheet, T_Rules, TTyped } from '../typed'

import $if from '../../conditions/$if'

export interface Shape extends TSheeter.ShapeAncestor {
  rulesets: {
    root: 'View',
    webOnly: '$Web',
    nativeOnly: '$NativeView',
  },
  props: {
    disabled: boolean
  },
  theme: {
    primary: string
  }
}

const hot = <T extends any>(arg: (prop) => T) => {
  return prop => arg(prop)
}

const hotPar = <T extends any>(par: T) => par

let d: { x }

hot<{ x }>(p => hotPar({ x: 0, y: 0 }))

const rules = T_Rules<Shape, 'View'>($ => [
  { margin: 0 },
  $.if(p => p.disabled)
])

const sheet = T_Sheet<Shape>(({ theme, T_Rules }) => ({

  root: T_Rules<'root'>($ => [
    { margin: 0 },
    $.if(p => p.disabled,
      {
        opacity: 0.5,
        //color: 'red' //ERROR
      },
      $.web(
        {
          color: theme.primary
        },
        $.wweb(),
        $.whot(p => []),
        $.whot(p => ({ ':hover': {}, x: '' })),
        $.wif(null),
        { ':hover': $.wif(null, { ':active': $.wwidth(640, { cursor: 'pointer' }) }) }
      )
    ),
    atomizeRuleset([]),
    // transform: [], //ERROR
    $.native(
      {
        margin: 0,
        transform: [],
        // color: 'red' //ERRR
      },
      $.nhot(p => ({
        color: 'red', // ????? 
        transform: [],
      })),
      $.nif(null),
    ),
    $.if(null),

    // $.if(p => p.disabledx), //ERROR
  ]),

  webOnly: T_Rules<'webOnly'>($ => [
    $.wif(null),
    //$.nif(null), //ERROR
    //$.if(null), //ERROR
  ]),
  nativeOnly: T_Rules<'nativeOnly'>($ => [
    //$.wif(null), //ERROR
    $.nif(null, { margin: 0 }),
    //$.if(null), //ERROR
  ])

}))


// const sheet2 = theme => ({
//   root: [
//     { margin: 0 },
//     $if(p => p.disabled, {
//       opacity: 0.5,
//       color: 'red' // NO ERROR
//     }),
//     $if(p => p.disabledx) // NO ERROR
//   ],
// })

