/** @jsx platform.createElement */
import React from 'react'

import { platform } from "reactxx-sheeter"
import { fireEvent } from 'react-testing-library'

import { ThemeProvider, useTheme } from "reactxx-use"

import { initPlatform, mount } from "./init-platform"
import { compCreator, Theme, Shape } from "./lib"

const secondThemeCreator = () => ({
  primaryColor: 'red',
  p1Prop: 'secondThemeProp'
})

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
      const Comp = compCreator({ defaultSheet: { root: {} } }, null)
      const {getByTestId, container, unmount} = mount(<App>
        <Comp themedProps={theme => ({ p1: theme.p1Prop })} classNameX={theme => ({ color: theme.primaryColor }) as any} />
      </App>)
      const toggle = getByTestId('toggle')
      
      expect(container).toMatchSnapshot()
      fireEvent.click(toggle)
      //toggle.click()
      expect(container).toMatchSnapshot()
      fireEvent.click(toggle)
      expect(container).toMatchSnapshot()
      unmount()
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

