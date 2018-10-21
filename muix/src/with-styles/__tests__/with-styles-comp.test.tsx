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
        return <React.Fragment>
          <h2>Hallo world</h2>
          <div classNameX={root}>
            {children}
          </div>
        </React.Fragment>
      },
      Comp => <Comp>
        Text
        <span>text</span>
      </Comp>)
  });
});
