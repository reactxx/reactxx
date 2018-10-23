/** @jsx platform.createElement */
import React from 'react'

import { platform } from 'reactxx-sheeter'

import { ts, traceComponentEx, ReactAny } from "reactxx-tests";

describe("WITH STYLES TRACE LEVELS", () => {
  it("trace 1 WEB", () => traceTest(true, 1));
  it("trace 1 NATIVE", () => traceTest(false, 1));
  it("trace 2 WEB", () => traceTest(true, 2));
  it("trace 2 NATIVE", () => traceTest(false, 2));
  it("trace 3 WEB", () => traceTest(true, 3));
  it("trace 3 NATIVE", () => traceTest(false, 3));
  it("trace 4 WEB", () => traceTest(true, 4));
  it("trace 4 NATIVE", () => traceTest(false, 4));
  it("trace 5 WEB", () => traceTest(true, 5));
  it("trace 5 NATIVE", () => traceTest(false, 5));
});

const traceTest = (isWeb: boolean, traceLevel: 1 | 2 | 3 | 4 | 5) => {

  traceComponentEx(isWeb, { traceLevel },
    {
      root: ts.view = {
        backgroundColor: 'gray'
      },
      label: {}, webOnly: {}, nativeOnly: {},
    },
    ({ classes, classNameX, toClassNames, styleX }) => {
      const root = toClassNames([classes.root, classNameX])
      return <ReactAny classNameX={root} styleX={styleX}>
        {`traceLevel=${traceLevel}`}
      </ReactAny>
    },
    Comp => <Comp classNameX={{ padding: 10 }} styleX={{ margin: 10 }}>
      Text
  </Comp>)
}
