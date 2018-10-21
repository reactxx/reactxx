/** @jsx platform.createElement */
import React from 'react'

import { TSheeter } from 'reactxx-typings'
import { platform } from 'reactxx-sheeter'

import { ts, traceComponentEx, Shape, ReactAny, theme, ThemeProvider } from "reactxx-tests"

describe("WITH STYLES THEME", () => {
  it("WEB", () => traceTest(true));
  it("NATIVE", () => traceTest(false));
});

const customTheme: TSheeter.getTheme<Shape> = {
  ...theme,
  secondary: {
    ...theme.secondary,
    normal: {
      color: 'lightcyan',
      background: 'black',
    },
  },
}

const traceTest = (isWeb: boolean) => {

  traceComponentEx(isWeb, 3,

    theme => ({
      label: [
        theme.secondary.normal,
        {
          fontWeight: 'bold'
        }
      ],
      root: {},
      webOnly: {},
      nativeOnly: {},
    }),

    ({ classes, toClassNames, children }) => {
      return <ReactAny classNameX={toClassNames([classes.label])}>{children}</ReactAny>
    },

    Comp => <ReactAny>
      <Comp>Default Theme</Comp>
      <ThemeProvider theme={customTheme}>
        <Comp>Custom Theme</Comp>
      </ThemeProvider>
    </ReactAny>
  )
}
