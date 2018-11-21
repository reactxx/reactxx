import { TAtomize, TSheeter, TCommonStyles } from "reactxx-typings"
import { Shape, theme } from 'reactxx-typings-test/shape'

import { $web, $native, $if, $hot, $ifelse, $width } from 'reactxx-sheeter'

const r1: TSheeter.RulesetOrAtomized<'View'> = {
  // color: 'red' // ERROR
}
const r2: TSheeter.RulesetOrAtomized<'View'> = [
  {
    // color: 'red' // ERROR
  }
]

const r3: TSheeter.Sheet<Shape>['root'] = {
  // color: 'red' // ERROR
}

const r4: TSheeter.Sheet<Shape>['root'] = [
  {
    // color: 'red' // ERROR
  }
]

const r5: TSheeter.RulesetOrAtomized<'View'> = [
  // color: 'red' // ERROR
  $if<null, 'View'>(null, {
    // color: 'red' // ERROR
  }),
  $ifelse<null, 'View'>(null, {
    // color: 'red' // ERROR
  }, [{
    // color: 'red' // ERROR
  }]),
  $web(null, {
    color: 'red'
  }),
  $native<'$NativeView'>(null, {
    // color: 'red' // ERROR
    transform: []
  }),
  $hot<{backgroundColor:string}, 'View'>(({backgroundColor}) => ({
    // color: 'red' // ERROR
    backgroundColor
  })),
  $width<'View'>(1024, {
    // color: 'red' // ERROR
  }),
]

const s1: TSheeter.PartialSheet<Shape> = {
  root: {
    // color: 'red' // error
  }
}

const s2: TSheeter.PartialSheet<Shape> = {
  root: [
    {
      // color: 'red' // error
    }
  ]
}

const classNames: TAtomize.Ruleset = null

const s3: TSheeter.PartialSheet<Shape> = {
  root: classNames
}

const s4: TSheeter.Sheet<Shape> = {
  root: [
    classNames,
    $if<{ color: string }, 'View'>(({ color }) => true,
      {
        // color: 'red' // error
        // transform: [] // error
      }
    ),
    {
      // color: 'red' // error
      // transform: [] // error
    },
    $web(
      {
        color: 'red',
        ':hover': {
          color: 'blue',
          ':active': {
            color: 'green',
          }
        }
      },
      $if<{}, '$Web'>(null, { ':hover': { color: 'red' } }, classNames),
    ),
    $native<'$NativeView'>(
      {
        transform: [],
        // color: 'red' // error
      },
      classNames,
      $if<{}, '$NativeView'>(null, {transform: []}), // error
    ),
  ],
  label: [
    {
      color: 'red' // error
      // transform: [] // error
    },
    $web({
      color: 'red',
    }),
    $native({
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
    $web({
      color: 'red'
    }),
    $if<null, '$Web'>(null, { ':hover': {} }),
  ],
  nativeOnly: [
    {
      transform: []
      // color: 'red' // error
    },
    classNames,
    $native<'$NativeView'>({
      transform: [],
      // color: 'red' // error
    }),
  ]
}

