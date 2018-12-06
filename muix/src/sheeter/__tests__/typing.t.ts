import { Shape as ShapeLow, theme } from 'reactxx-typings-test/shape.t'

import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'

import { getEngine } from '../utils/get-engine'

interface Shape extends ShapeLow {
  sheetQuery: {
    backgroundColor
    color
  }
}

const { THEMED, WEB, NATIVE, IF, HOT, IFELSE, WIDTH, STYLE, $toClassNames, $atomizeRuleset
} = getEngine<Shape>()


const r1: TTyped.Rulesets<'V'> = {
  // color: 'red' // ERROR
}
const r2: TTyped.Rulesets<'V'> = [
  {
    // color: 'red' // ERROR
  }
]

const r3: TTyped.Sheet<Shape>['root'] = {
  // color: 'red' // ERROR
}

const r4: TTyped.Sheet<Shape>['root'] = [
  {
    // color: 'red' // ERROR
  }
]

const r5: TTyped.Rulesets<V> = [
  // color: 'red' // ERROR
  IF<V>(null, {
    // color: 'red' // ERROR
  }),
  IFELSE<V>(null, {
    // color: 'red' // ERROR
  }, [{
    // color: 'red' // ERROR
  }]),
  WEB<V>(null, {
    color: 'red'
  }),
  NATIVE<V>(null, {
    // color: 'red' // ERROR
    transform: []
  }),
  HOT<V>(({ $sheetQuery: { backgroundColor } }) => ({
    // color: 'red' // ERROR
    backgroundColor
  })),
  WIDTH<V>(1024, {
    // color: 'red' // ERROR
  }),
]

const s1: TTyped.PartialSheet<Shape> = {
  root: {
    // color: 'red' // error
  }
}

const s2: TTyped.PartialSheet<Shape> = {
  root: [
    {
      // color: 'red' // error
    }
  ]
}

const classNames: TTyped.Ruleset<'V'> = null
const classNamesW: TTyped.Ruleset<'$W'> = null

const s3: TTyped.PartialSheet<Shape> = {
  root: classNames
}

const s4: TTyped.Sheet<Shape> = {
  root: [
    classNames,
    IF<V>(({ $sheetQuery: { color } }) => true,
      {
        // color: 'red' // error
        // transform: [] // error
      }
    ),
    {
      // color: 'red' // error
      // transform: [] // error
    },
    WEB<V>(
      {
        color: 'red',
        ':hover': {
          color: 'blue',
          ':active': {
            color: 'green',
          }
        }
      },
      IF<$W>(null, { ':hover': { color: 'red' } }, classNamesW),
    ),
    NATIVE<V>(
      {
        transform: [],
        // color: 'red' // error
      },
      classNames,
      IF<$V>(null, { transform: [] }), // error
    ),
  ],
  label: [
    {
      color: 'red' // error
      // transform: [] // error
    },
    WEB<T>({
      color: 'red',
    }),
    NATIVE<T>({
      transform: [],
      color: 'red'
    }),
  ],
  webOnly: [
    {
      color: 'red',
      ':hover': {
        color: 'blue',
        ':active': {
          color: 'green',
        }
      }
    },
    WEB<$W>({
      color: 'red'
    }),
    IF<$W>(null, { ':hover': {} }),
  ],
  nativeOnly: [
    {
      transform: []
      // color: 'red' // error
    },
    //classNames,
    NATIVE<$T>({
      transform: [],
      // color: 'red' // error
    }),
  ]
}

