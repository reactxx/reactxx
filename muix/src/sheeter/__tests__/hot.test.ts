import {
  atomizeRuleset,
  $hot, toClassNamesWithQuery
} from "reactxx-sheeter"
import { Shape, theme } from "reactxx-typings-test/shape"
import { initPlatform } from "./init-platform"


describe("SHEETER HOT", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 just $hot", () => {
      ruleset = atomizeRuleset([
        { color: 'green' },
        $hot(state => ({
          color: 'red'
        })),
      ])
      expect(ruleset).toMatchSnapshot()
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

