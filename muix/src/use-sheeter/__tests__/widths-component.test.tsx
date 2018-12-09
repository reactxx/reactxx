/** @jsx platform.createElement */

import React from 'react'

import { TEngine, V } from 'reactxx-typings'
import { platform, atomizeRuleset, toClassNamesWithQuery, WIDTH, useWidths, setActWidth } from "reactxx-sheeter"

import { initPlatform, render } from "./init-platform.t"

describe("SHEETER $WIDTHS", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    describe("04 change width", () => {
      beforeEach(() => initPlatform(isWeb, { dataTraceFlag: 'short' }))

      const getSheetRoot = () => atomizeRuleset([
        WIDTH([0, 640], { color: 'red' }),
        WIDTH([640, 1024], { color: 'green' }),
        WIDTH(1024, { color: 'blue' }),
      ])

      const useApp = () => {
        // part of useSheeter
        const { actWidth, breakpoints, getWidthMap } = useWidths()
        const query: TEngine.WidthsQuery = {
          $widths: { actWidth, breakpoints }
        }
        const sheetRoot = React.useMemo(getSheetRoot)

        // component code
        const renderCount = React.useRef(0)
        renderCount.current++

        const root = toClassNamesWithQuery(query, sheetRoot) as any as V

        return { getWidthMap, root, renderCount: renderCount.current }
      }

      const App: React.SFC = () => {
        const { root, renderCount } = useApp()
        return <div classNames={root}>{`rendered: ${renderCount}x`}</div>
      }
      App['$c$'] = true

      const WidthsMapApp: React.SFC = () => {
        const { root, renderCount, getWidthMap } = useApp()
        const [mobile, tablet, desktop] = getWidthMap([640, 1024])
        return <div classNames={root}>
          {`${mobile ? 'mobile' : ''}${tablet ? 'tablet' : ''}${desktop ? 'desktop' : ''} (rendered: ${renderCount}x)`}
        </div>
      }
      WidthsMapApp['$c$'] = true

      const test = (App: React.ComponentType) => {
        setActWidth(640)
        const wrapper = render(<App />)
        expect(wrapper.container).toMatchSnapshot()
        setActWidth(1024)
        expect(wrapper.container).toMatchSnapshot()
        setActWidth(1025)
        expect(wrapper.container).toMatchSnapshot()
        wrapper.unmount()
      }

      it("01 use just width styles", () => test(App))
      it("02 use width flags and styles", () => test(WidthsMapApp))

    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

