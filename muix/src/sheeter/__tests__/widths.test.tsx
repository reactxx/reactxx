///** @jsx platform.createElement */

import React from 'react'

import { TEngine } from 'reactxx-typings'
import { atomizeRuleset, toClassNamesWithQuery, $width } from "reactxx-sheeter"

import { initPlatform, dump } from "./init-platform.t"

describe("SHEETER $WIDTHS", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 empty", () => {
      ruleset = atomizeRuleset([
        { color: 'green' },
        $width([640, 1024], null, {}, undefined),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    it("02 simple", () => {
      ruleset = atomizeRuleset([
        $width([640, 1024], { color: 'red' }),
      ])
      expect(ruleset).toMatchSnapshot()
    })

    describe("03 toClassNamesWithQuery's width change", () => {
      beforeEach(() => initPlatform(isWeb))

      const rulesets = [
        $width([0, 640], { color: 'red' }),
        $width([640, 1024], { color: 'green' }),
        $width(1024, { color: 'blue' }),
      ]
      !window.isWeb && it("01: native, 300", () =>
        //**WIDHT**
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>({ $widths: { actWidth: 300 } }, ...rulesets))
      )
      !window.isWeb && it("02: native, 640", () =>
        //**WIDHT**
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>({ $widths: { actWidth: 641 } }, ...rulesets))
      )
      !window.isWeb && it("03: native, 1024", () =>
        //**WIDHT**
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>({ $widths: { actWidth: 1025 } }, ...rulesets))
      )
      !window.isWeb && it("04: native, undefined", () =>
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>(undefined, ...rulesets))
      )
      window.isWeb && it("05: web", () =>
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>(undefined, ...rulesets))
      )
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

