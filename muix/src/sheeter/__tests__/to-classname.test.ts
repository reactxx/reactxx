import { initPlatform, dump } from "./init-platform.t"
import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'

import { getEngine } from '../utils/get-engine'

interface Shape {
  theme: { primary }
  sheetQuery: { opened: boolean }
}

const { THEMED, IF, IFELSE, WEB, NATIVE, STYLE, $toClassNames, ATOMIZE
} = getEngine<Shape>()

describe("TO CLASSNAMES", () => {

  type Par = { opened: boolean, theme: null }
  const sheetQuery = (opened: boolean) => ({ opened })
  const query = (opened: boolean, ...ruleset: TTyped.RulesetSimple[]) => dump($toClassNames<TTyped.RulesetIds>(sheetQuery(opened), ...ruleset))

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01: null", () => dump($toClassNames(null, null)))
    it("02: null, {}, undefined", () => dump($toClassNames(null, undefined)))
    it("03: mixed", () => dump($toClassNames(null,
      ATOMIZE<T>({ color: 'red' }), // ruleset source
      ATOMIZE<T>({ color: 'blue' }, { color: 'yellow' }), // atomized ruleset
      IF<T>(p => true, { color: 'maroon' }), // temporary item
      $toClassNames<T>(null, ATOMIZE<T>({ color: 'green' })) // atomized ruleset
    )))
    it("04: query => opened", () => query(true,
      IF(p => p.opened, { color: 'red' }),
      IF(p => !p.opened, { color: 'blue' }),
    ))
    it("05: query => closed", () => query(false,
      IF(p => p.opened, { color: 'red' }),
      IF(p => !p.opened, { color: 'blue' }),
    ))
    it("06: query => closed => pre-atomized", () => query(false, ATOMIZE<T>(
      IF<T>(p => p.opened, { color: 'red' }),
      IF<T>(p => !p.opened, { color: 'blue' }),
    )))
    it("07: query => closed => pre-queried", () => query(false,
      $toClassNames<T>(sheetQuery(false),
        IF<T>(p => p.opened, { color: 'red' }),
        IF<T>(p => !p.opened, { color: 'blue' }),
      )
    ))
    it("08: static if and ifelse", () => {
      const inRender = (disabled: boolean) =>
        dump($toClassNames<T>(sheetQuery(false),
          IF<T>(disabled, { color: 'grey' }),
          IFELSE<T>(disabled, { backgroundColor: 'blue' }, { backgroundColor: 'green' }),
        ))
      inRender(true)
      inRender(false)
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
