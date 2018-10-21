/** @jsx Sheeter.createElement */
import React from 'react'

import * as Sheeter from 'reactxx-sheeter'

import { ts, traceComponentEx } from "reactxx-tests";

window.__TRACELEVEL__ = 2

describe("WITH STYLES", () => {
  it("WEB", () => {
    traceComponentEx(true,
      {
        root: ts.view = {
          backgroundColor: 'gray'
        }
      },
      ({ classes, classNameX, toClassNames, children }) => {
        const root = toClassNames([classes.root, classNameX])
        return <div classNameX={root}>
          {children}
        </div>
      },
      Comp => <Comp>
        Text
      </Comp>)
  });
});
