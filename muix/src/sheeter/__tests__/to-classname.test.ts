import { initPlatform, dump } from "./init-platform.t"
import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'

import { getTypedEngine } from 'reactxx-sheeter'

interface Shape {
  theme: { primary }
  sheetQuery: { opened: boolean }
}

const { $themed, $if, $ifelse, $web, $native, $rules, $toClassNames, $atomize
} = getTypedEngine<Shape>()

describe("TO CLASSNAMES", () => {

  type Par = { opened: boolean, theme: null }
  const sheetQuery = (opened: boolean) => ({ $sheetQuery: { opened } })
  const query = (opened: boolean, ...ruleset: TTyped.RulesetSimple[]) => dump($toClassNames<TTyped.RulesetIds>(sheetQuery(opened), ...ruleset))

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01: null", () => dump($toClassNames(null, null)))
    it("02: null, {}, undefined", () => dump($toClassNames(null, undefined)))
    it("03: mixed", () => dump($toClassNames(null,
      $atomize<T>({ color: 'red' }), // ruleset source
      $atomize<T>({ color: 'blue' }, { color: 'yellow' }), // atomized ruleset
      $if<T>(p => true, { color: 'maroon' }), // temporary item
      $toClassNames<T>(null, $atomize<T>({ color: 'green' })) // atomized ruleset
    )))
    it("04: query => opened", () => query(true,
      $if(p => p.$sheetQuery.opened, { color: 'red' }),
      $if(p => !p.$sheetQuery.opened, { color: 'blue' }),
    ))
    it("05: query => closed", () => query(false,
      $if(p => p.$sheetQuery.opened, { color: 'red' }),
      $if(p => !p.$sheetQuery.opened, { color: 'blue' }),
    ))
    it("06: query => closed => pre-atomized", () => query(false, $atomize<T>(
      $if<T>(p => p.$sheetQuery.opened, { color: 'red' }),
      $if<T>(p => !p.$sheetQuery.opened, { color: 'blue' }),
    )))
    it("07: query => closed => pre-queried", () => query(false,
      $toClassNames<T>(sheetQuery(false),
        $if<T>(p => p.$sheetQuery.opened, { color: 'red' }),
        $if<T>(p => !p.$sheetQuery.opened, { color: 'blue' }),
      )
    ))
    it("08: static if and ifelse", () => {
      const inRender = (disabled: boolean) =>
        dump($toClassNames<T>(sheetQuery(false),
          $if<T>(disabled, { color: 'grey' }),
          $ifelse<T>(disabled, { backgroundColor: 'blue' }, { backgroundColor: 'green' }),
        ))
      inRender(true)
      inRender(false)
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
