import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'
import { getEngine } from '../utils/get-engine'

//let $atomizeRuleset, $toClassNames
import { initPlatform, dump, afterLastWin } from "./init-platform.t"

import { theme, Theme } from "reactxx-typings-test/shape.t"

interface Shape {
  theme: Theme
  sheetQuery: { primary: string }
}

const { $themed, $if, $web, $hot, $native, $rules, $toClassNames, $atomizeRuleset, $ifelse, $mergeRulesets, $width
} = getEngine<Shape>()


describe("SHEETER HOT", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 null", () => {
      ruleset = $atomizeRuleset<V>([
        $hot<V>(null),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("02 empty", () => {
      ruleset = $atomizeRuleset([
        $hot(null),
        $hot(() => null),
        $hot(() => [null, {}, undefined]),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("03 just $hot", () => {
      ruleset = $atomizeRuleset([
        { color: 'green' },
        $hot(state => ({
          color: 'red'
        })),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("04: color: 'red'", () => afterLastWin($toClassNames<T>(null,
      $hot<T>(state => ({
        color: 'red'
      }))
    )))

    it("05: nested", () => afterLastWin($toClassNames<T>(null,
      $hot<T>(state => $hot<T>(state => ({ color: 'red' })))
    )))

    it("06: nested", () => afterLastWin($toClassNames<T>(null,
      $hot<T>(state => [{ margin: 0 }, $hot<T>(state => ({ color: 'red' }))])
    )))

    describe("07: use attr", () => {
      beforeEach(() => initPlatform(isWeb))

      // '{ color: queryPar.primary }' is processet very late (during $toClassNames processing)
      const RS1 = $hot<T>(queryPar => ({ color: queryPar.$sheetQuery.primary }))
      const RS2 = $hot<T>(queryPar => $if<T>(true, { color: queryPar.$sheetQuery.primary }))
      const RS3 = $hot<T>(queryPar => [
        $if<T>(queryPar => queryPar.$sheetQuery.primary === 'red', { color: queryPar.$sheetQuery.primary }),
        $hot<T>(queryPar => ({ backgroundColor: queryPar.$sheetQuery.primary }))
      ])

      const test = (msg: string, ruleset: T) => {
        it("01: red " + msg, () => afterLastWin($toClassNames<T>({ $sheetQuery: { primary: 'red' } },
          ruleset // color is red
        )))
        it("02: green " + msg, () => afterLastWin($toClassNames<T>({ $sheetQuery: { primary: 'green' } },
          ruleset // color is green
        )))
      }
      test('RS1', RS1)
      test('RS2', RS2)
      test('RS3', RS3)
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
