/** @jsx platform.createElement */
import React from 'react'

import { platform } from 'reactxx-sheeter'

import { ts, traceComponentEx } from "reactxx-tests";

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

const traceTest = (isWeb: boolean, level: 1 | 2 | 3 | 4 | 5) => {
  window.__TRACELEVEL__ = level
  traceComponentEx(isWeb,
    {
      root: ts.view = {
        backgroundColor: 'gray'
      }
    },
    ({ classes, classNameX, toClassNames, styleX, children }) => {
      const root = toClassNames([classes.root, classNameX])
      return <div classNameX={root} styleX={styleX}>
        {children}
      </div>
    },
    Comp => <Comp classNameX={{ padding: 10 }} styleX={{ margin: 10 }}>
      Text
  </Comp>)
}
