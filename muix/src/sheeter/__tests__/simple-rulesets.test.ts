import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'
import { getSheetUtils } from 'reactxx-sheeter'

import { theme, Theme } from "reactxx-typings-test/shape"
import { initPlatform } from "./init-platform"


interface Shape {
  theme: Theme
  sheetQuery: {opened: boolean}  
}


const { $themed, $if, $web, $hot, $native, $rules, $toClassNames, $atomizeRuleset
} = getSheetUtils<Shape>()



const t = $web({ color: 'green' })

describe("SHEETER SIMPLE RULESET", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 (null)", () => {
      ruleset = $atomizeRuleset(null)
      expect(ruleset).toMatchSnapshot()
    })

    it("02 ({})", () => {
      ruleset = $atomizeRuleset([{}])
      expect(ruleset).toMatchSnapshot()
    })

    it("03 ([null, undefined, {}])", () => {
      ruleset = $atomizeRuleset([null, undefined, {}])
      expect(ruleset).toMatchSnapshot()
    })

    it("04 ({ color: 'red', margin: 0 })", () => {
      ruleset = $atomizeRuleset([{ color: 'red', margin: 0 }])
      expect(ruleset).toMatchSnapshot()
    })

    it("05 ([{ color: 'red' }, { margin: 0 }])", () => {
      ruleset = $atomizeRuleset([{ color: 'red' }, { margin: 0 }])
      expect(ruleset).toMatchSnapshot()
    })

    it("06 (...$web: { color: 'green' }, $native: { color: 'blue' })", () => {
      ruleset = $atomizeRuleset([
        {
          color: 'red',
        },
        $web<T>({ color: 'green' }),
        $native<T>({ color: 'blue' }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("07 atomizeRuleset(atomizeRuleset({color: 'red'", () => {
      ruleset = $atomizeRuleset<T>([$atomizeRuleset<T>([{
        color: 'red'
      }])])
      expect(ruleset).toMatchSnapshot()
    })

    it("08 atomizeRuleset({$web: atomizeRuleset({ :hover color: 'red', $native: atomizeRuleset({ color: 'green'", () => {
      ruleset = $atomizeRuleset<T>([
        $web<T>($atomizeRuleset<$W>([{ ':hover': { color: 'red' } }])),
        $native<T>($atomizeRuleset<T>([{ color: 'green' }]))
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("09 ERROR for atomizeRuleset({:hover': atomizeRuleset(...", () => {
      if (!window.isWeb) return
      const fnc = () => {
        $atomizeRuleset<V>([
          $web<V>({
            ':hover': $atomizeRuleset<$W>([
              { color: 'red' }
            ]),
          })])
      }
      expect(fnc).toThrow(/.*/)
    })

    it("10 ERROR for atomizeRuleset({:hover': [ARRAY]", () => {
      if (!window.isWeb) return
      const fnc = () => $atomizeRuleset<V>([
        $web<V>({
          ':hover': [
            {},
            $atomizeRuleset<$W>([{ color: 'red' }]),
            { margin: 10 }
          ]
        })
      ])
      expect(fnc).toThrow(/.*/)
    })

    it("11 with theme", () => {
      ruleset = $atomizeRuleset<T>(theme => [
        theme.primary.normal,
        $web<T>(theme.secondary.normal),
        $native<T>(theme.secondary.normal),
      ], theme)
      expect(ruleset).toMatchSnapshot()
    })

    it("12 ATOMIZE modifies source object", () => {
      const source = [
        { color: 'blue' },
        $web({ color: 'red' }),
        $native({ color: 'green' }),
      ]
      ruleset = $atomizeRuleset(source)
      expect(ruleset).toMatchSnapshot()
      expect(source).toMatchSnapshot()
    })

    it("13 condition in pseudo", () => {
      if (!window.isWeb) return
      ruleset = $atomizeRuleset<V>([
        $web<V>({
          ':hover': $web<$W>({ color: 'red' }),
        }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("14 mix in pseudo array", () => {
      if (!window.isWeb) return
      ruleset = $atomizeRuleset<V>([
        $web<V>({
          color: 'green',
          ':hover': [
            { color: 'blue' },
            $web<$W>({ ':active': { color: 'red' } })
          ],
        }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("15 just $hot", () => {
      ruleset = $atomizeRuleset([
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

