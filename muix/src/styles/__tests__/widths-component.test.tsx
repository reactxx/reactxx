

import React from 'react'

import { TEngine, V, TTyped } from 'reactxx-typings'
import { platform, atomizeRuleset,  WIDTH, useWidths, setActWidth } from "reactxx-styles"

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

        const { actWidth, breakpoints, getWidthMap } = useWidths()
        
        const query: TEngine.WidthsQuery = {
          $widths: { actWidth, breakpoints }
        }
        const sheetRoot = React.useMemo(getSheetRoot)

        // component code
        const renderCount = React.useRef(0)
        renderCount.current++

        const root = platform.getStyleProps(query, [sheetRoot as any as V]) as TTyped.StylePropsWeb// toClassNamesWithQuery(query, sheetRoot) as any as V

        return { getWidthMap, root, renderCount: renderCount.current }
      }

      const App: React.SFC = () => {
        const { root, renderCount } = useApp()
        return <div {...root}>{`rendered: ${renderCount}x`}</div>
      }

      const WidthsMapApp: React.SFC = () => {
        const { root, renderCount, getWidthMap } = useApp()
        const [mobile, tablet, desktop] = getWidthMap([640, 1024])
        return <div {...root}>
          {`${mobile ? 'mobile' : ''}${tablet ? 'tablet' : ''}${desktop ? 'desktop' : ''} (rendered: ${renderCount}x)`}
        </div>
      }

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

