///** @jsx platform.createElement */

import React from 'react'

import { TEngine } from 'reactxx-typings'
import { atomizeRuleset, toClassNamesWithQuery, $width } from "reactxx-styler"

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
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>({ $widths: { actWidth: 300 } }, ...rulesets))
      )
      !window.isWeb && it("02: native, 640", () =>
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>({ $widths: { actWidth: 640 } }, ...rulesets))
      )
      !window.isWeb && it("03: native, 1024", () =>
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>({ $widths: { actWidth: 1024 } }, ...rulesets))
      )
      !window.isWeb && it("04: native, undefined", () =>
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>(undefined, ...rulesets))
      )
      window.isWeb && it("05: web", () =>
        dump(toClassNamesWithQuery<TEngine.WidthsQuery>(undefined, ...rulesets))
      )
    })

    // describe("04 change width", () => {
    //   beforeEach(() => initPlatform(isWeb, { dataTraceFlag: 'short' }))

    //   const getSheet = () => atomizeRuleset([
    //     $width([0, 640], { color: 'red' }),
    //     $width([640, 1024], { color: 'green' }),
    //     $width(1024, { color: 'blue' }),
    //   ])

    //   const useApp = () => {
    //     const { actWidth, breakpoints, getWidthMap } = useWidths()
    //     const query: TEngine.WidthsQuery = {
    //       $widths: { actWidth, breakpoints }
    //     }
    //     const sheetRoot = React.useMemo(getSheet)
    //     // component code
    //     const renderCount = React.useRef(0)
    //     renderCount.current++

    //     const root = toClassNamesWithQuery(query, sheetRoot)

    //     return { getWidthMap, root, renderCount: renderCount.current }
    //   }

    //   const App: React.SFC = () => {
    //     const { root, renderCount } = useApp()
    //     return <div classNameX={root}>{`rendered: ${renderCount}x`}</div>
    //   }
    //   App['$c$'] = true

    //   const WidthsMapApp: React.SFC = () => {
    //     const { root, renderCount, getWidthMap } = useApp()
    //     const [mobile, tablet, desktop] = getWidthMap([640, 1024])
    //     return <div classNameX={root}>
    //       {`${mobile ? 'mobile' : ''}${tablet ? 'tablet' : ''}${desktop ? 'desktop' : ''} (rendered: ${renderCount}x)`}
    //     </div>
    //   }
    //   WidthsMapApp['$c$'] = true

    //   const test = (App: React.ComponentType) => {
    //     setActWidth(300)
    //     const wrapper = render(<App />)
    //     expect(wrapper.container).toMatchSnapshot()
    //     setActWidth(640)
    //     expect(wrapper.container).toMatchSnapshot()
    //     setActWidth(1024)
    //     expect(wrapper.container).toMatchSnapshot()
    //     wrapper.unmount()
    //   }

    //   it("01 use just width styles", () => test(App))
    //   it("02 use width flags and styles", () => test(WidthsMapApp))

    // })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

