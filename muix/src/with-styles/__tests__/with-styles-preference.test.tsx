/** @jsx platform.createElement */
import React from 'react'

import { platform } from 'reactxx-sheeter'

import { ts, traceComponentEx, ReactAny } from "reactxx-tests";

describe("WITH STYLE PREFERENCE", () => {
  it("WEB", () => traceTest(true));
  it("NATIVE", () => traceTest(false));
});

const traceTest = (isWeb: boolean) => {

  traceComponentEx(isWeb, 2,
    // sheet
    {
      root: ts.view = {
        width: 11,
        height: 11,
        maxHeight: 11,
        maxWidth: 11,
        paddingTop: 11,
        paddingLeft: 11,
        paddingRight: 11,
      },
      label: {}, webOnly: {}, nativeOnly: {},
    },
    // component code
    ({ classes, classNameX, toClassNames, styleX }) => {
      return <React.Fragment>

        <ReactAny classNameX={toClassNames([classes.root, classNameX])} styleX={styleX}>
          toClassNames([classes.root, classNameX])
        </ReactAny>

        {/*********** Reverse order in toClassNames's ruleset array *************/}
        <ReactAny classNameX={toClassNames([classNameX, classes.root])} styleX={styleX}>
          toClassNames([classNameX, classes.root])
        </ReactAny>
        
      </React.Fragment>
    },
    // component usage (Comp = withStyle(comp, <withStyle options>)
    Comp => <Comp classNameX={{ maxWidth: 33 }} classes={{ root: { paddingRight: 33 } }} styleX={{ paddingTop: 33 }} />,
    // withStyle options
    {
      defaultProps: {
        classes: { root: { width: 22 } },
        classNameX: { height: 22 },
        styleX: { maxHeight: 22, paddingTop: 22 }
      }
    })
}
