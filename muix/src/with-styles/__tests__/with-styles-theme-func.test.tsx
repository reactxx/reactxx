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
      ...theme.secondary.normal,
      background: 'lightcyan',
    },
  },
}

const traceTest = (isWeb: boolean) => {

  traceComponentEx(isWeb, { traceLevel: 2},

    theme => ({
      label: theme.secondary.normal,
      root: {},
      webOnly: {},
      nativeOnly: {},
    }),

    ({ classes, classNameX, toClassNames, styleX, children }) =>
      <ReactAny classNameX={toClassNames([classes.label, classNameX])} styleX={styleX}>{children}</ReactAny>,

    Comp => <ReactAny>
      <Comp
        classes={theme => ({ label: { color: theme.secondary.normal.background } })}
        classNameX={theme => ({ backgroundColor: theme.secondary.normal.background })}
        styleX={theme => ({ borderBottomColor: theme.secondary.normal.background })}
      >Default Theme</Comp>
      <ThemeProvider theme={customTheme}>
        <Comp
          classes={theme => ({ label: { color: theme.secondary.normal.background } })}
          classNameX={theme => ({ backgroundColor: theme.secondary.normal.background })}
          styleX={theme => ({ borderBottomColor: theme.secondary.normal.background })}
        >Custom Theme</Comp>
      </ThemeProvider>
    </ReactAny>,

    {
      defaultProps: {
        classes: theme => ({ root: { borderLeftColor: theme.secondary.normal.background } }),
        classNameX: theme => ({ borderRightColor: theme.secondary.normal.background }),
        styleX: theme => ({ borderTopColor: theme.secondary.normal.background }),
      }
    }
  )
}
