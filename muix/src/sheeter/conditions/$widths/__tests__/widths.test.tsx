/** @jsx platform.createElement */

import React from 'react'

import {
  platform, atomizeRuleset, toClassNamesWithQuery,
  $width, devSetActWidth, useWidths, useWidthsLow, $WidthsQuery
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
      it("01: native, 300", () =>
        !window.isWeb && dump(toClassNamesWithQuery<$WidthsQuery>({ actWidth: 300 }, ...rulesets))
      )
      it("02: native, 640", () =>
        !window.isWeb && dump(toClassNamesWithQuery<$WidthsQuery>({ actWidth: 640 }, ...rulesets))
      )
      it("03: native, 1024", () =>
        !window.isWeb && dump(toClassNamesWithQuery<$WidthsQuery>({ actWidth: 1024 }, ...rulesets))
      )
      it("04: native, undefined", () =>
        !window.isWeb && dump(toClassNamesWithQuery<$WidthsQuery>(undefined, ...rulesets))
      )
      it("05: web", () =>
        window.isWeb && dump(toClassNamesWithQuery<$WidthsQuery>(undefined, ...rulesets))
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
        const allRulesetWidths = new Set<number>()
        const handler = useWidthsLow(allRulesetWidths)
        const sheetRoot = React.useMemo(sheet)
        const query: $WidthsQuery = { actWidth: handler.actWidth, allRulesetWidths: handler.breakpoints }
        // component code
        const renderCount = React.useRef(0)
        renderCount.current++
        const root = toClassNamesWithQuery<$WidthsQuery>(query, sheetRoot)
        return { handler, root, renderCount: renderCount.current }
      }

      const UseWidthsApp: React.SFC = () => {
        const { handler, root, renderCount } = useApp()
        const [mobile, tablet, desktop] = useWidths(handler, [640, 1024])
        return <div classNameX={root}>
          {`${mobile ? 'mobile' : ''}${tablet ? 'tablet' : ''}${desktop ? 'desktop' : ''} (rendered: ${renderCount}x)`}
        </div>
      }
      UseWidthsApp['$c$'] = true

      const App: React.SFC = () => {
        const { handler, root, renderCount } = useApp()
        return <div classNameX={root}>{`rendered: ${renderCount}x`}</div>
      }
      UseWidthsApp['$c$'] = true

      const test = (App: React.ComponentType) => {
        devSetActWidth(300)
        const wrapper = mount(<App />)
        expect(wrapper.container).toMatchSnapshot()
        devSetActWidth(640)
        expect(wrapper.container).toMatchSnapshot()
        devSetActWidth(1024)
        expect(wrapper.container).toMatchSnapshot()
        wrapper.unmount()
      }

      it.only("01 UseWidth", () => test(UseWidthsApp))
      it.only("02 just styles", () => test(App))

    })


    it.only("04 change width", () => {


    })


  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

