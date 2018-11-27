import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'
import { getTypedEngine } from 'reactxx-sheeter'

//let $atomizeRuleset, $toClassNames
import { initPlatform, dump, afterLastWin } from "./init-platform"

import { theme, Theme } from "reactxx-typings-test/shape"

interface Shape {
  theme: Theme
  sheetQuery: {primary: string}  
}

const { $themed, $if, $web, $hot, $native, $rules, $toClassNames, $atomizeRuleset, $ifelse, $mergeRulesets, $width
} = getTypedEngine<Shape>()


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
      const ruleset = $hot<T>(queryPar => ({ color: queryPar.primary }))

      it("01: red", () => afterLastWin($toClassNames<T>({ primary: 'red' },
        ruleset // color is red
      )))
      it("02: green", () => afterLastWin($toClassNames<T>({ primary: 'green' },
        ruleset // color is green
      )))
      it("03: with $if", () => afterLastWin($toClassNames<T>({ primary: 'blue' },
        $hot<T>(queryPar => [
          { borderColor: queryPar.primary },
          $if<T>(({primary}) => primary==='blue', ruleset),
        ])
      )))
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
