/** @jsx platform.createElement */
import React from 'react'
import { render } from 'react-testing-library'

import { TSheeter } from 'reactxx-typings'
import { platform } from 'reactxx-styler'

import { ts, traceComponentEx, Shape, ReactAny, theme, ThemeProvider } from "reactxx-tests"
import console = require('console');

// const jsdom = require("jsdom")
// const {JSDOM} = jsdom

// const dom = new JSDOM(`<!DOCTYPE html><p style='color:lightblue'>Hello world</p>`)
// const ser = dom.serialize() 
// describe("COLR PROBLEM", () => {
//   let comp = render(<div style={{ color: 'lightblue', backgroundColor: 'blue' }} />)
//   let { color, backgroundColor } = (comp.container.firstElementChild as HTMLElement).style
//   comp = render(<div style={{ color: 'blue', backgroundColor: 'lightblue' }} />)
//   let { color: color2, backgroundColor: backgroundColor2 } = (comp.container.firstElementChild as HTMLElement).style
//   console.log({ color, backgroundColor, color2,  backgroundColor2 })
// })

describe("WITH STYLES THEME", () => {
  it("WEB", () => traceTest(true));
  it("NATIVE", () => traceTest(false));
});

const customTheme: TSheeter.getTheme<Shape> = {
  ...theme,
  secondary: {
    ...theme.secondary,
    normal: {
      color: 'black',
      backgroundColor: 'blue',
    },
  },
}

const traceTest = (isWeb: boolean) => {

  traceComponentEx(isWeb, { traceLevel: 2 },

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

    ({ classes, toClassNames, children, styleX }) => {
      return <ReactAny classNameX={toClassNames([classes.label])} styleX={styleX}>{children}</ReactAny>
      //return <div style={{ color: 'lightblue' }} />
    },

    //Comp => <div style={{ color: 'lightblue', backgroundColor: 'blue' }} />
    Comp => <ReactAny>
      <Comp>Default Theme</Comp>
      <ThemeProvider theme={customTheme}>
        <Comp>Custom Theme</Comp>
      </ThemeProvider>
    </ReactAny>
  )
}
