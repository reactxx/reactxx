
import React from 'react'

import { platform } from "reactxx-sheeter"
import { fireEvent } from 'react-testing-library'

import { ThemeProvider, useTheme } from "reactxx-use-sheeter"

import { initPlatform, render } from "./init-platform.t"
import { compCreator, Theme } from "./lib.t"

const secondThemeCreator = () => ({
  primaryColor: 'red',
  p1Prop: 'secondThemeProp'
} as Theme)

describe("THEME PROVIDER", () => {

  const ToggleTheme: React.SFC = () => {
    const [theme, setTheme] = useTheme()
    const secondTheme = React.useRef(secondThemeCreator())
    return <span data-testid='toggle' onClick={() => {
      setTheme(theme === secondTheme.current ? null : secondTheme.current)
    }} />
  }

  const App: React.SFC = ({ children }) => {
    const [theme, setTheme] = React.useState(null)
    return <ThemeProvider<Theme> theme={theme}>
      <ToggleTheme />
      {children}
    </ThemeProvider>
  }

  const doTest = (isWeb: boolean) => {
    beforeEach(() => {
      initPlatform(isWeb, { dataTraceFlag: 'short' })
      platform.getDefaultTheme = () => ({
        primaryColor: 'gray',
        p1Prop: 'themeProp'
      })
    })

    it('01: ', () => {
      const Comp = compCreator(null)
      const {getByTestId, container, unmount} = render(<App>
        <Comp themedProps={theme => ({ p1: theme.p1Prop })} classNames={theme => ({ color: theme.primaryColor })} />
      </App>)
      const toggle = getByTestId('toggle')
      
      expect(container).toMatchSnapshot()
      fireEvent.click(toggle)
      expect(container).toMatchSnapshot()
      fireEvent.click(toggle)
      expect(container).toMatchSnapshot()
      unmount()
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

