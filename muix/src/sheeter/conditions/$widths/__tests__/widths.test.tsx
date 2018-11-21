/** @jsx platform.createElement */

import React from 'react'

import {
  platform, atomizeRuleset, toClassNamesWithQuery,
  $width, setActWidth, useWidths, useWidthsLow, $WidthsQuery
} from "reactxx-sheeter"

import { initPlatform, dump, mount } from "../../../__tests__/init-platform"

const App: React.SFC = () => {
  useWidthsLow
  return null
}


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
        dump(toClassNamesWithQuery<$WidthsQuery>({ actWidth: 300 }, ...rulesets))
      )
      !window.isWeb && it("02: native, 640", () =>
        dump(toClassNamesWithQuery<$WidthsQuery>({ actWidth: 640 }, ...rulesets))
      )
      !window.isWeb && it("03: native, 1024", () =>
        dump(toClassNamesWithQuery<$WidthsQuery>({ actWidth: 1024 }, ...rulesets))
      )
      !window.isWeb && it("04: native, undefined", () =>
        dump(toClassNamesWithQuery<$WidthsQuery>(undefined, ...rulesets))
      )
      window.isWeb && it("05: web", () =>
        dump(toClassNamesWithQuery<$WidthsQuery>(undefined, ...rulesets))
      )
    })

    describe("04 change width", () => {
      beforeEach(() => initPlatform(isWeb))

      const sheet = () => atomizeRuleset([
        $width([0, 640], { color: 'red' }),
        $width([640, 1024], { color: 'green' }),
        $width(1024, { color: 'blue' }),
      ])

      const useApp = () => {
        // part of useReactXX hook:
        const widthsHandler = useWidthsLow()
        const query: $WidthsQuery = { 
          actWidth: widthsHandler.actWidth, breakpoints: widthsHandler.breakpoints 
        }
        const sheetRoot = React.useMemo(sheet)
        // component code
        const renderCount = React.useRef(0)
        renderCount.current++
        const root = toClassNamesWithQuery<$WidthsQuery>(query, sheetRoot)
        return { widthsHandler, root, renderCount: renderCount.current }
      }

      const App: React.SFC = () => {
        const { root, renderCount } = useApp()
        return <div classNameX={root}>{`rendered: ${renderCount}x`}</div>
      }
      App['$c$'] = true

      const UseWidthsApp: React.SFC = () => {
        const { widthsHandler, root, renderCount } = useApp()
        const [mobile, tablet, desktop] = useWidths(widthsHandler, [640, 1024])
        return <div classNameX={root}>
          {`${mobile ? 'mobile' : ''}${tablet ? 'tablet' : ''}${desktop ? 'desktop' : ''} (rendered: ${renderCount}x)`}
        </div>
      }
      UseWidthsApp['$c$'] = true

      const test = (App: React.ComponentType) => {
        setActWidth(300)
        const wrapper = mount(<App />)
        expect(wrapper.container).toMatchSnapshot()
        setActWidth(640)
        expect(wrapper.container).toMatchSnapshot()
        setActWidth(1024)
        expect(wrapper.container).toMatchSnapshot()
        wrapper.unmount()
      }

      it("01 use just width styles", () => test(App))
      it("02 use width flags and styles", () => test(UseWidthsApp))

    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

