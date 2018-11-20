import {
  atomizeRuleset,
  $web, $native, $hot,
} from "reactxx-sheeter"
import { Shape, theme } from "reactxx-typings-test/shape"
import { initPlatform } from "./init-platform"

const t = $web({ color: 'green' })

describe("SHEETER SIMPLE RULESET", () => {

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

    it.only("08 atomizeRuleset({$web: atomizeRuleset({ :hover color: 'red', $native: atomizeRuleset({ color: 'green'", () => {
      ruleset = atomizeRuleset([
        $web(atomizeRuleset({ ':hover': { color: 'red' } })),
        $native(atomizeRuleset({ color: 'green' }))
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("09 ERROR for atomizeRuleset({:hover': atomizeRuleset(...", () => {
      if (!window.isWeb) return
      const fnc = () => {
        atomizeRuleset(
          $web({
            ':hover': atomizeRuleset({ color: 'red' }),
          }))
      }
      expect(fnc).toThrow(/.*/)
    })

    it("10 ERROR for atomizeRuleset({:hover': [ARRAY]", () => {
      if (!window.isWeb) return
      const fnc = () => atomizeRuleset(
        $web({
          ':hover': [
            atomizeRuleset({ color: 'red' }),
            { margin: 10 }
          ]
        })
      )
      expect(fnc).toThrow(/.*/)
    })

    it("11 with theme", () => {
      ruleset = atomizeRuleset<'label', Shape>(theme => [
        theme.primary.normal,
        $web(theme.secondary.normal),
        $native(theme.secondary.normal),
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

    it("13 condition in pseudo", () => {
      if (!window.isWeb) return
      ruleset = atomizeRuleset([
        $web({
          ':hover': $web<'$Web'>({ color: 'red' }),
        }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("14 mix in pseudo array", () => {
      if (!window.isWeb) return
      ruleset = atomizeRuleset([
        $web({
          color: 'green',
          ':hover': [
            { color: 'blue' },
            $web<'$Web'>({ ':active': { color: 'red' } })
          ],
        }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("15 just $hot", () => {
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

