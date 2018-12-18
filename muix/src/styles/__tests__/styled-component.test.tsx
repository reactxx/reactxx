import React from 'react'

import { fireEvent } from 'react-testing-library'

import { initPlatform, render, cleanup } from "./init-platform.t"
import { TComponents, $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'

import { getTypedEngine, useStyles, getComponent } from 'reactxx-styles'
import { mergePropsCode } from '../utils/merge';

//*** INNER COMPONENT

interface iShapeLow extends TTyped.ShapeAncestor {
  props: { enabled?: boolean }
}

const i = getTypedEngine<iShapeLow>()

const isheet = {
  root: i.STYLE<T>(
    { backgroundColor: 'yellow' },
    i.IFELSE<T>(p => p.enabled, { color: 'red' }, { color: 'gray' })
  )
}

interface iShape extends iShapeLow {
  sheet: typeof isheet
}

const iconfig: TComponents.ComponentConfig<iShape> = {
  displayName: 'inner-component',
  $sheet: isheet
}

const getInner: TComponents.GetComponent<iShape> = config => props => {
  const { getRootWebStyleProps, propsCode: { enabled, children } } = useStyles<iShape>(props, config)
  return <span {...getRootWebStyleProps()}>
    INNER  {enabled ? 'ENABLED' : 'DISABLED'}: {children}
  </span>
}

const Inner = getComponent(getInner, iconfig)

//*** OUTER COMPONENT

interface ShapeLow extends TTyped.ShapeAncestor {
  props: { openedInit?: boolean }
  sheetQuery: { opened?: boolean }
}

const { COMPONENT, IF, IFELSE, WEB, NATIVE, STYLE, COMPILE
} = getTypedEngine<ShapeLow>()

const sheet = {
  root: STYLE<V>(
    IFELSE<V>(p => p.opened, { padding: 0 }, { padding: 10 })
  ),
  Left: COMPONENT(Inner, {
    root: STYLE<T>(
      {
        borderColor: 'red'
      },
      IFELSE<T>(p => p.opened, { fontWeight: '500' }, { fontWeight: '300' })
    )
  }),
  Right: COMPONENT(Inner, {
    root: STYLE<T>({
      borderColor: 'green'
    })
  })

}

interface Shape extends ShapeLow {
  sheet: typeof sheet
}

const config: TComponents.ComponentConfig<Shape> = {
  displayName: 'outer-component',
  $sheet: sheet
}

const p: TTyped.getProps<Shape> = {}

const getOuter: TComponents.GetComponent<Shape> = config => props => {
  const { getRootWebStyleProps, classes, propsCode, propsCode: { openedInit, children } } = useStyles<Shape>(props, config)

  const [openedState, setOpenedState] = React.useState(openedInit)
  // set state to sheet query
  propsCode.opened = openedState

  return <div data-testid='toggle' {...getRootWebStyleProps()} onClick={() => setOpenedState(!openedState)}>
    OUTER {openedState ? 'OPENED' : 'CLOSED'}: {children}
    <classes.Left>LEFT</classes.Left>
    <classes.Right enabled>RIGHT</classes.Right>
  </div>
}

const Outer = getComponent(getOuter, config)

describe("STYLED COMPONENT", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    afterEach(cleanup)


    it("01: Outer", () => {
      const wrapper = render(<Outer />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it("02: Outer opened", () => {
      const wrapper = render(<Outer openedInit />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it("03: Outer both", () => {
      const wrapper = render(<div>
        <Outer openedInit />
        <Outer openedInit={false} />
      </div>)
      expect(wrapper.container).toMatchSnapshot()
    })

    it("04: change open with click", () => {
      const {getByTestId, container} = render(<div>
        <Outer/>
      </div>)
      const toggle = getByTestId('toggle')
      expect(container).toMatchSnapshot()
      fireEvent.click(toggle)
      expect(container).toMatchSnapshot()
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
