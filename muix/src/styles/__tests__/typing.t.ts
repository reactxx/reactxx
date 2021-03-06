import { Shape as ShapeLow, theme } from 'reactxx-typings-test/shape.t'

import { $W, $T, $V, $I, V, T, I, O, TTyped } from 'reactxx-typings'

import { getTypedEngine } from '../utils/get-engine'

interface Shape extends ShapeLow {
  sheetQuery: {
    backgroundColor
    color
  }
}

const { THEMED, WEB, NATIVE, IF, HOT, IFELSE, WIDTH, STYLE, COMPILE
} = getTypedEngine<Shape>()


const r1: TTyped.Rulesets<'V'> = {
  // color: 'red' // ERROR
}
const r2: TTyped.Rulesets<'$V'> = [
  {
    // color: 'red' // ERROR
  }
]

const r3: TTyped.Sheet<Shape>['root'] = {
  // color: 'red' // ERROR
}

const r4: TTyped.Sheet<Shape>['label'] = [
  {
    color: 'red'
  }
]

const r5 = STYLE<V>(
  // color: 'red' // ERROR
  IF<V>(null, {
    // color: 'red' // ERROR
  }),
  IFELSE<V>(null, {
    // color: 'red' // ERROR
  }, [{
    // color: 'red' // ERROR
  }]),
  WEB(null, {
    color: 'red'
  }),
  NATIVE<$V>(null, {
    // color: 'red' // ERROR
    transform: []
  }),
  HOT<V>(({ backgroundColor  }) => ({
    // color: 'red' // ERROR
    backgroundColor
  })),
  WIDTH<V>(1024, {
    // color: 'red' // ERROR
  }),
)

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
    IF<V>(({ color }) => true,
      {
        // color: 'red' // error
        // transform: [] // error
      }
    ),
    {
      // color: 'red' // error
      // transform: [] // error
    },
    WEB(
      {
        color: 'red',
        ':hover': {
          color: 'blue',
          ':active': {
            color: 'green',
          }
        }
      },
      IF<V>(null),
      IF<$W>(null, { ':hover': { color: 'red' } }, classNamesW),
    ),
    NATIVE<$V>(
      {
        transform: [],
        // color: 'red' // error
      },
      classNames,
      IF<$V>(null, { transform: [] }), 
    ),
  ],
  label: STYLE<T>(
    {
      color: 'red' // error
      // transform: [] // error
    },
    WEB({
      color: 'red',
    }),
    NATIVE<$T>({
      transform: [],
      color: 'red'
    }),
  ),
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
    WEB({
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

// let b = null
// let tt: T = 'T'
// let ttt = i && !getEngine && tt
// const x = i && b && tt
// const xx = IF<$T>(null, null as T, null as V, i && !getEngine && tt)