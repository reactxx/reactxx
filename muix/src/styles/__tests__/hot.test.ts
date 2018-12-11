import React from 'react'
import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'
import { getEngine, toClassNamesWithQuery } from 'reactxx-styles'

//let $atomizeRuleset, $toClassNames
import { initPlatform, dump, afterLastWin } from "./init-platform.t"

import { theme, Theme } from "reactxx-typings-test/shape.t"

interface Shape {
  theme: Theme
  sheetQuery: { primary: string }
}

const { THEMED, IF, WEB, HOT, NATIVE, STYLE, $toClassNames, ATOMIZE, IFELSE, $mergeRulesets, WIDTH
} = getEngine<Shape>()


describe("SHEETER HOT", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 null", () => {
      ruleset = ATOMIZE<V>(
        HOT<V>(null),
      )
      expect(ruleset).toMatchSnapshot()
    })

    it("02 empty", () => {
      ruleset = ATOMIZE(
        HOT(null),
        HOT(() => null),
        HOT(() => [null, {}, undefined]),
      )
      expect(ruleset).toMatchSnapshot()
    })

    it("03 just $hot", () => {
      ruleset = ATOMIZE<T>(
        { color: 'green' },
        HOT<T>(state => ({
          color: 'red'
        })),
      )
      expect(ruleset).toMatchSnapshot()
    })

    it("04: color: 'red'", () => afterLastWin($toClassNames<T>(null,
      HOT<T>(state => ({
        color: 'red'
      }))
    )))

    it("05: nested", () => afterLastWin($toClassNames<T>(null,
      HOT<T>(state => HOT<T>(state => ({ color: 'red' })))
    )))

    it("06: nested", () => afterLastWin($toClassNames<T>(null,
      HOT<T>(state => [{ margin: 0 }, HOT<T>(state => ({ color: 'red' }))])
    )))

    describe("07: use attr", () => {
      beforeEach(() => initPlatform(isWeb))

      // '{ color: queryPar.primary }' is processet very late (during $toClassNames processing)
      const RS1 = HOT<T>(queryPar => ({ color: queryPar.primary }))
      const RS2 = HOT<T>(queryPar => IF<T>(true, { color: queryPar.primary }))
      const RS3 = HOT<T>(queryPar => [
        IF<T>(queryPar => queryPar.primary === 'red', { color: queryPar.primary }),
        HOT<T>(queryPar => ({ backgroundColor: queryPar.primary }))
      ])

      const test = (msg: string, ruleset: T) => {
        it("01: red " + msg, () => afterLastWin($toClassNames<T>({ primary: 'red' },
          ruleset // color is red
        )))
        it("02: green " + msg, () => afterLastWin($toClassNames<T>({ primary: 'green' },
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

type ReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never

type FirstParType<T extends (par) => any> =
  T extends (par: infer R) => any ? R : never

const f = (idx: string) => 12
type TT = ReturnType<typeof f>
type FT = FirstParType<typeof f>

interface PropsConfig { default, code }
type Props<T extends PropsConfig> = T['default'] & T['code']
type Pars<Config extends PropsConfig> = Record<string, (p: Props<Config>) => boolean>

type SheetPars<Config extends PropsConfig, Par extends Pars<Config>> = Par & { theme, $if }

const propsConfig = {
  default: {
    disabled: false
  },
  code: {
    computed: false
  },
  props: null,
  propsCode: null,

  root: null as Shape,
  root2: null as ['T', React.AnchorHTMLAttributes<HTMLAnchorElement>],

}


let ddd: React.AnchorHTMLAttributes<any>

type TCfg = Props<typeof propsConfig>

const c: Partial<TCfg> = {
  //disabled: true,
  //computed: false
}

const sheetPars = {
  getDisabled: (p: TCfg) => p.disabled,
}

const sheet = ({ theme, $if }: SheetPars<typeof propsConfig, typeof sheetPars>) => {
  const getDisabled = (p: TCfg) => p.disabled
  return {
    root: null as V,
    label: $if(getDisabled, {})
  }
}

interface getShape<Config extends PropsConfig, Sheet extends Function> {
  sheet: GetReturnType<Sheet>
  props: Config['default']
  sheetQuery: Config['code']
}

interface Shape2 extends getShape<typeof propsConfig, typeof sheet> { }

type TTT = Shape2['sheet']

type TSheet = GetReturnType<typeof sheet>

type GetReturnType<original extends Function> =
  original extends (...x: any[]) => infer returnType ? returnType : never

let $map, $hoot2
const sheet_ = ({ theme, getDisabled, getVariant, $if }) => {
  root: [
    $if(getDisabled, {}),
    WIDTH([0, 640], {}),
    $map(getVariant, {

    }),
    HOT(( { primary }) => ({}))
  ]
}

