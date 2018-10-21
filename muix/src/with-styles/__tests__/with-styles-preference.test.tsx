/** @jsx platform.createElement */
import React from 'react'

import { platform } from 'reactxx-sheeter'

import { ts, traceComponentEx, ReactAny } from "reactxx-tests";

describe("WITH STYLES DEFAULT PROPS", () => {
  it("WEB", () => traceTest(true));
  it("NATIVE", () => traceTest(false));
});

const traceTest = (isWeb: boolean) => {

  traceComponentEx(isWeb, 2,
    {
      root: ts.view = {
        width: 11,
        height: 11,
        maxHeight: 11,
        maxWidth: 11,
        paddingTop: 11,
        paddingLeft: 11,
      }
    },
    ({ classes, classNameX, toClassNames, styleX, children }) => {
      const root = toClassNames([classes.root, classNameX])
      const classNameFirst = toClassNames([classNameX, classes.root])
      return <React.Fragment>
        <ReactAny classNameX={root} styleX={styleX}>
          toClassNames([classes.root, classNameX])
        </ReactAny>
        <ReactAny classNameX={classNameFirst} styleX={styleX}>
          toClassNames([classNameX, classes.root])
        </ReactAny>
      </React.Fragment>
    },
    Comp => <Comp classNameX={{ maxWidth: 33 }} styleX={{ paddingTop: 33 }} />,
    {
      defaultProps: {
        classes: { root: { width: 22 } },
        classNameX: { height: 22 },
        styleX: { maxHeight: 22, paddingTop: 22 }
      }
    })
}
