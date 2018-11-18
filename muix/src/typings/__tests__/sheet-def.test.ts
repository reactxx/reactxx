import { TSheeter, TCommonStyles } from "reactxx-typings"
import { Shape, theme } from './shape'
import { TAtomize } from '../atomize';

const $web = <T extends TCommonStyles.RulesetNativeIds>(...rulesets: TSheeter.RulesetWebOrAtomized<T>[]) => {
  return null as TSheeter.RulesetItem<T>
}

const $if = <T extends TCommonStyles.RulesetNativeIds>(cond: () => boolean, ...rulesets: TSheeter.RulesetOrAtomized<T>[]) => {
  return null as TSheeter.RulesetItem<T>
}

const $native = <T extends TCommonStyles.RulesetNativeIds>(...rulesets: TSheeter.RulesetNativeOrAtomized<T>[]) => {
  return null as TSheeter.RulesetItem<T>
}

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
    $if<'View'>(null,
      {
        // color: 'red' // error
        // transform: [] // error
      }
    ),
    {
      // color: 'red' // error
      // transform: [] // error
    },
    $web<'View'>(
      {
        color: 'red',
        ':hover': {
          color: 'blue',
          ':active': {
            color: 'green',
          }
        }
      },
      $if<'$Web'>(null, { ':hover': { color: 'red' } }, classNames),
      // $if<'View'>(null, {}), // error
    ),
    $native<'View'>(
      {
        transform: [],
        // color: 'red' // error
      },
      classNames,
      $if<'$NativeView'>(null, {}), // error
      //$if<'Text'>(null, {}), // error
      //$if<'$Web'>(null), // error
    ),
  ],
  label: [
    {
      color: 'red' // error
      // transform: [] // error
    },
    $web<'Text'>({
      color: 'red',
    }),
    $native<'Text'>({
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
    $web<'$Web'>({
      color: 'red'
    }),
    $if<'$Web'>(null, { ':hover': {}}),
    // $native<'$Web'>({ }), //error
    // $web<'View'>({ }), //error
  ],
  nativeOnly: [
    {
      transform: []
    },
    classNames,
    // $web<'$Web'>({}), // error
    // $native<'View'>({}), v
    $native<'$NativeView'>({
      transform: [],
      // color: 'red' // error
    }),
  ]
}

