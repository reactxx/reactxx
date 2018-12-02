/** @jsx platform.createElement */
import React from 'react'

import { platform } from 'reactxx-sheeter'

import { traceComponentEx, ReactAny } from "reactxx-tests";

describe("WITH STYLE PREFERENCE", () => {
  it("WEB", () => traceTest(true));
  it("NATIVE", () => traceTest(false));
});

const traceTest = (isWeb: boolean) => {

  traceComponentEx(isWeb, { traceLevel: 2},
    // sheet
    theme => ({
      root: {},
      label: {}, webOnly: {}, nativeOnly: {},
    }),
    // component code
    props => <ReactAny {...props} />,
    // component usage (Comp = withStyle(comp, <withStyle options>)
    Comp => <Comp p3='33' p4='33' themedProps={theme => ({ p4: '44' })} />,
    // withStyle options
    {
      defaultProps: {
        p1: '11',
        p2: '11',
        p3: '11',
        p4: '11',
        themedProps: theme => ({
          p2: '22',
          p3: '22',
          p4: '22',
        })
      }
    })
}
