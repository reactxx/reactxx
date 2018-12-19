import { initPlatform, dumpLow } from "./init-platform.t"
import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'

import { getTypedEngine } from 'reactxx-styles'
import {toClassNamesWithQuery} from '../utils/to-classnames'

interface Shape {
  theme: { primary }
  sheetQuery: { opened: boolean }
}

const { THEMED, IF, IFELSE, WEB, NATIVE, STYLE, COMPILE
} = getTypedEngine<Shape>()

describe("TO CLASSNAMES", () => {

  type Par = { opened: boolean, theme: null }
  const sheetQuery = (opened: boolean) => ({ opened })
  const query = (opened: boolean, ...ruleset: TTyped.RulesetSimple[]) => dumpLow(toClassNamesWithQuery(sheetQuery(opened), ruleset))

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01: null", () => dumpLow(toClassNamesWithQuery(null, null)))
    it("02: null, {}, undefined", () => dumpLow(toClassNamesWithQuery(null, undefined)))
    it("03: mixed", () => dumpLow(toClassNamesWithQuery(null, [
      COMPILE<T>({ color: 'red' }), // ruleset source
      COMPILE<T>({ color: 'blue' }, { color: 'yellow' }), // atomized ruleset
      IF<T>(p => true, { color: 'maroon' }), // temporary item
      toClassNamesWithQuery(null, [COMPILE<T>({ color: 'green' })]) // atomized ruleset
    ])))
    it("04: query => opened", () => query(true,
      IF(p => p.opened, { color: 'red' }),
      IF(p => !p.opened, { color: 'blue' }),
    ))
    it("05: query => closed", () => query(false,
      IF(p => p.opened, { color: 'red' }),
      IF(p => !p.opened, { color: 'blue' }),
    ))
    it("06: query => closed => pre-atomized", () => query(false, COMPILE<T>(
      IF<T>(p => p.opened, { color: 'red' }),
      IF<T>(p => !p.opened, { color: 'blue' }),
    )))
    it("07: query => closed => pre-queried", () => query(false,
      toClassNamesWithQuery(sheetQuery(false), [
        IF<T>(p => p.opened, { color: 'red' }),
        IF<T>(p => !p.opened, { color: 'blue' }),
      ]) as any
    ))
    it("08: static if and ifelse", () => {
      const inRender = (disabled: boolean) =>
        dumpLow(toClassNamesWithQuery(sheetQuery(false), [
          IF<T>(disabled, { color: 'grey' }),
          IFELSE<T>(disabled, { backgroundColor: 'blue' }, { backgroundColor: 'green' }),
        ]))
      inRender(true)
      inRender(false)
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
