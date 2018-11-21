import {
  atomizeRuleset,
  $hot, $if, toClassNamesWithQuery
} from "reactxx-sheeter"
import { Shape, theme } from "reactxx-typings-test/shape"
import { initPlatform, dump, afterLastWin } from "./init-platform"


describe("SHEETER HOT", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 null", () => {
      ruleset = atomizeRuleset(
        $hot(null),
      )
      expect(ruleset).toMatchSnapshot()
    })

    it("02 empty", () => {
      ruleset = atomizeRuleset([
        $hot(null),
        $hot(() => null),
        $hot(() => [null, {}, undefined]),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("03 just $hot", () => {
      ruleset = atomizeRuleset([
        { color: 'green' },
        $hot(state => ({
          color: 'red'
        })),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("04: color: 'red'", () => afterLastWin(toClassNamesWithQuery(null,
      $hot(state => ({
        color: 'red'
      }))
    )))

    it("05: nested", () => afterLastWin(toClassNamesWithQuery(null,
      $hot(state => $hot(state => ({ color: 'red' })))
    )))

    it("06: nested", () => afterLastWin(toClassNamesWithQuery(null,
      $hot(state => [{ margin: 0 }, $hot(state => ({ color: 'red' }))])
    )))

    describe("07: use attr", () => {
      beforeEach(() => initPlatform(isWeb))

      interface Par { color: string; theme?}
      const ruleset = $hot(({ color }) => ({ color }))

      it("01: red", () => afterLastWin(toClassNamesWithQuery<Par>({ color: 'red' },
        ruleset
      )))
      it("02: green", () => afterLastWin(toClassNamesWithQuery<Par>({ color: 'green' },
        ruleset
      )))
      it("03: with $if", () => afterLastWin(toClassNamesWithQuery<Par>({ color: 'blue' },
        $if(() => true, ruleset)
      )))
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
