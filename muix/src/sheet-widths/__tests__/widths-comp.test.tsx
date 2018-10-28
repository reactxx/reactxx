/** @jsx platform.createElement */
import React from 'react'
import { platform } from "reactxx-sheeter";

import { ts, traceComponentEx, ReactAny, setActWidth } from "reactxx-tests";
import { sheetWidths_registerVariantHandler, WidthsProvider, widthsPipe, onWidthChanged } from "../index";
import { Provider } from 'react-fela';

sheetWidths_registerVariantHandler()

describe("WIDTHS COMPONENT", () => {
  it("NATIVE 300", () => traceTest(false, 300))
  it("NATIVE 800", () => traceTest(false, 800))
  it("NATIVE 1200", () => traceTest(false, 1200))
  it("WEB 300", () => traceTest(true, 300))
  it("WEB 800", () => traceTest(true, 800))
  it("WEB 1200", () => traceTest(true, 1200))
})

const traceTest = (isWeb: boolean, actWidth: number) => {

  traceComponentEx(isWeb, { traceLevel: 2, actWidth },

    {
      root: ts.view = {
        $widths: {
          '-640': {
            backgroundColor: 'blue'
          },
          '640-1024': {
            backgroundColor: 'green'
          },
          '1024-': {
            backgroundColor: 'red'
          },
        }
      },
      label: {}, webOnly: {}, nativeOnly: {},
    },

    ({ classes, toClassNames, actWidths }) => {
      return <ReactAny classNameX={toClassNames([classes.root])} actWidths={actWidths} actWidth={platform.actWidth()}>
        {actWidths.mobileWidth ? 'MOBILE' : actWidths.tabletWidth ? 'TABLET' : 'DESKTOP'}
      </ReactAny>
    },

    Comp => <WidthsProvider><Comp /></WidthsProvider>,

    {
      nativeHasWidthRule: true,
      getPipes: options => ({
        afterPropsCode: [widthsPipe],
      }),
      defaultProps: {
        actWidths: {
          mobileWidth: '-640',
          tabletWidth: '640-1024',
          desktopWidth: '1024-'
        }
      }
    },

    (wrapper, Comp) => {
      expect(wrapper).toMatchSnapshot()

      setActWidth(platform.actWidth() + 444)
      onWidthChanged()
      wrapper.update()

      expect(wrapper).toMatchSnapshot();
    }
  )
}
      // const myComponents = wrapper.find(Comp)
      // const props = myComponents.instance()
