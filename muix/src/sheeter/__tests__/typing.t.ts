import { Shape as ShapeLow, theme } from 'reactxx-typings-test/shape.t'

import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'

import { getTypedEngine } from 'reactxx-sheeter'

interface Shape extends ShapeLow {
  sheetQuery: {
    backgroundColor    
    color
  }
}

const { $themed, $web, $native, $if, $hot, $ifelse, $width, $rules, $toClassNames, $atomizeRuleset 
} = getTypedEngine<Shape>()


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
  $if<V>(null, {
    // color: 'red' // ERROR
  }),
  $ifelse<V>(null, {
    // color: 'red' // ERROR
  }, [{
    // color: 'red' // ERROR
  }]),
  $web<V>(null, {
    color: 'red'
  }),
  $native<V>(null, {
    // color: 'red' // ERROR
    transform: []
  }),
  $hot<V>(({backgroundColor}) => ({
    // color: 'red' // ERROR
    backgroundColor
  })),
  $width<V>(1024, {
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
    $if<V>(({ color }) => true,
      {
        // color: 'red' // error
        // transform: [] // error
      }
    ),
    {
      // color: 'red' // error
      // transform: [] // error
    },
    $web<V>(
      {
        color: 'red',
        ':hover': {
          color: 'blue',
          ':active': {
            color: 'green',
          }
        }
      },
      $if<$W>(null, { ':hover': { color: 'red' } }, classNamesW),
    ),
    $native<V>(
      {
        transform: [],
        // color: 'red' // error
      },
      classNames,
      $if<$V>(null, {transform: []}), // error
    ),
  ],
  label: [
    {
      color: 'red' // error
      // transform: [] // error
    },
    $web<T>({
      color: 'red',
    }),
    $native<T>({
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
    $web<$W>({
      color: 'red'
    }),
    $if<$W>(null, { ':hover': {} }),
  ],
  nativeOnly: [
    {
      transform: []
      // color: 'red' // error
    },
    //classNames,
    $native<$T>({
      transform: [],
      // color: 'red' // error
    }),
  ]
}

