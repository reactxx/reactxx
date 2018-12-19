//

import React from 'react'

import { TEngine } from 'reactxx-typings'
import { atomizeRuleset, toClassNames, WIDTH } from "reactxx-styles"

import { initPlatform, dump } from "./init-platform.t"

describe("SHEETER $WIDTHS", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 empty", () => {
      ruleset = atomizeRuleset([
        { color: 'green' },
        WIDTH([640, 1024], null, {}, undefined),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("02 simple", () => {
      ruleset = atomizeRuleset([
        WIDTH([640, 1024], { color: 'red' }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    describe("03 toClassNamesRuleset's width change", () => {
      beforeEach(() => initPlatform(isWeb))

      const rulesets = [
        WIDTH([0, 640], { color: 'red' }),
        WIDTH([640, 1024], { color: 'green' }),
        WIDTH(1024, { color: 'blue' }),
      ]
      !window.isWeb && it("01: native, 300", () =>
        //**WIDHT**
        dump(toClassNames({ $widths: { actWidth: 300 } }, ...rulesets))
      )
      !window.isWeb && it("02: native, 640", () =>
        //**WIDHT**
        dump(toClassNames({ $widths: { actWidth: 641 } }, ...rulesets))
      )
      !window.isWeb && it("03: native, 1024", () =>
        //**WIDHT**
        dump(toClassNames({ $widths: { actWidth: 1025 } }, ...rulesets))
      )
      !window.isWeb && it("04: native, undefined", () =>
        dump(toClassNames(undefined, ...rulesets))
      )
      window.isWeb && it("05: web", () =>
        dump(toClassNames(undefined, ...rulesets))
      )
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

