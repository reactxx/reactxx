
import React from 'react'

import { platform } from 'reactxx-sheeter'

import { ts, traceComponentEx, ReactAny } from "reactxx-tests";

describe("WITH STYLE PREFERENCE", () => {
  it("WEB", () => traceTest(true));
  it("NATIVE", () => traceTest(false));
});

const setCSS = (fromNameIdx: number, platform: number = 0) => {
  const res = {}
  for (let i = fromNameIdx; i < CSSNames.length; i++)
    res[CSSNames[i]] = fromNameIdx * 10 + platform
  return res
}
const CSSNames = [
  'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomWidth',
  'borderLeftWidth', 'borderRightWidth',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopWidth',
  'gridRowEnd', 'gridRowStart',
  'marginBottom', 'marginLeft', 'marginRight', 'marginTop',
  'maxHeight', 'maxWidth',
  'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop',
]

const traceTest = (isWeb: boolean) => {

  traceComponentEx(isWeb, { traceLevel: 2 },

    // sheet
    {
      root: ts.view = [
        setCSS(0),
        {
          $web: setCSS(1, 1),
          $native: setCSS(1, 2)
        },
      ],
      label: {}, webOnly: {}, nativeOnly: {},
    },

    // component code
    ({ classes, classNameX, toClassNames, styleX }) => {
      return <ReactAny>

        <ReactAny classNameX={toClassNames([classes.root, classNameX])} styleX={styleX}>
          toClassNames([classes.root, classNameX])
        </ReactAny>

      </ReactAny>
    },

    // component usage (Comp = withStyle(comp, <withStyle options>)
    Comp => <Comp
      classes={{ root: [setCSS(6), { $web: setCSS(7, 1), $native: setCSS(7, 2) }] }}
      classNameX={[setCSS(12), { $web: setCSS(13, 1), $native: setCSS(13, 2) }]}
      styleX={[setCSS(18), { $web: setCSS(19, 1), $native: setCSS(19, 2) }]} />,

    // withStyle options
    {
      defaultProps: {
        classes: { root: [setCSS(2), { $web: setCSS(3, 1), $native: setCSS(3, 2) }] },
        classNameX: [setCSS(8), { $web: setCSS(9, 1), $native: setCSS(9, 2) }],
        styleX: [setCSS(14), { $web: setCSS(15, 1), $native: setCSS(15, 2) }]
      }
    },

    // withStyle override options
    {
      defaultProps: {
        classes: { root: [setCSS(4), { $web: setCSS(5, 1), $native: setCSS(5, 2) }] },
        classNameX: [setCSS(10), { $web: setCSS(11, 1), $native: setCSS(11, 2) }],
        styleX: [setCSS(16), { $web: setCSS(17, 1), $native: setCSS(17, 2) }]
      }
    })

}
