import {
  atomizeRuleset,
  $web, $native,
} from "reactxx-sheeter"
import {TSheeter} from "reactxx-typings"
import { Shape, theme } from "reactxx-typings-test/shape"
import { initPlatform } from "./init-platform"

const t = $web({ color: 'green' })

describe("ATOMIZE RULESET", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 (null)", () => {
      ruleset = atomizeRuleset(null)
      expect(ruleset).toMatchSnapshot()
    })

    it("02 ({})", () => {
      ruleset = atomizeRuleset({})
      expect(ruleset).toMatchSnapshot()
    })

    it("03 ([null, undefined, {}])", () => {
      ruleset = atomizeRuleset([null, undefined, {}])
      expect(ruleset).toMatchSnapshot()
    })

    it("04 ({ color: 'red', margin: 0 })", () => {
      ruleset = atomizeRuleset({ color: 'red', margin: 0 })
      expect(ruleset).toMatchSnapshot()
    })

    it("05 ([{ color: 'red' }, { margin: 0 }])", () => {
      ruleset = atomizeRuleset([{ color: 'red' }, { margin: 0 }])
      expect(ruleset).toMatchSnapshot()
    })

    it("06 (...$web: { color: 'green' }, $native: { color: 'blue' })", () => {
      ruleset = atomizeRuleset([
        {
          color: 'red',
        },
        $web({ color: 'green' }),
        $native({ color: 'blue' }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("07 atomizeRuleset(atomizeRuleset({color: 'red'", () => {
      ruleset = atomizeRuleset(atomizeRuleset({
        color: 'red'
      }))
      expect(ruleset).toMatchSnapshot()
    })

    it("08 atomizeRuleset({$web: atomizeRuleset({ color: 'red', $native: atomizeRuleset({ color: 'green'", () => {
      ruleset = atomizeRuleset([
        $web(atomizeRuleset({ color: 'red' })),
        $native(atomizeRuleset({ color: 'green' }))
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("09 ERROR for atomizeRuleset({:hover': atomizeRuleset(...", () => {
      const fnc = () => {
        window.isWeb && atomizeRuleset(
          $web({
            ':hover': atomizeRuleset({ color: 'red' }) as any,
          }
        ))
      }
      window.isWeb && expect(fnc).toThrow(/.*/)
    })

    it("10 ERROR for atomizeRuleset({:hover': [ARRAY]", () => {
      const fnc = () => window.isWeb && atomizeRuleset(
        $web({
          ':hover': [
            { color: 'red' },
            { margin: 10 }
          ] as any
        })
      )
      window.isWeb && expect(fnc).toThrow(/.*/)
    })

    it("11 with theme", () => {
      ruleset = atomizeRuleset<'root', Shape>(theme => [
        theme.primary.normal,
        $web(theme.secondary.normal),
      ], theme)
      expect(ruleset).toMatchSnapshot()
    })

    it("12 ATOMIZE modifies source object", () => {
      const source = {
        color: 'blue',
        $web: { color: 'red' },
        $native: { color: 'green' },
      }
      ruleset = atomizeRuleset(source)
      expect(ruleset).toMatchSnapshot()
      expect(source).toMatchSnapshot()
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

