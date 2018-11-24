/** @jsx platform.createElement */

import React from 'react'

import {
  platform, atomizeRuleset, toClassNamesWithQuery,
  $width, setActWidth, useWidths, $WidthsQuery
} from "reactxx-sheeter"

import { TSheeter, TWithStyles, TComponents } from 'reactxx-typings'

import { initPlatform, dump, mount } from "./init-platform"
import { useSheeter } from "../index"

const themeCreator = () => ({
  primaryColor: 'gray',
  p1Prop: 'themeProp'
})

interface Shape extends TSheeter.ShapeAncestor {
  rulesets: {
    root: 'Text'
  },
  props: {
    p1: string
  },
  theme: {
    primaryColor: string
    p1Prop: string
  }
}

describe("USE SHEETER", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => {
      initPlatform(isWeb, { dataTraceFlag: 'short' })
      platform._withStyles.defaultTheme = themeCreator()
    })

    let Comp: TComponents.SFC<Shape>

    const CompCreator = (
      config: TWithStyles.ComponentConfig<Shape>,
      configOverride: TWithStyles.ComponentConfigOverride<Shape>,
      displayName?: 'Comp'
    ) => {
      const res: TComponents.SFC<Shape> = props => {
        const { toClassNames, propsCode, classes, classNameX, styleX
        } = useSheeter(props, config, displayName, configOverride)
        const root = toClassNames(classes.root, classNameX)
        return <div {...propsCode} classNameX={root} styleX={styleX as any} />
      }
      res.displayName = displayName
      res['$c$'] = true
      return res
    }


    it('01: config NULL', () => {
      Comp = CompCreator(null, null)
      const fnc = () => mount(<Comp />)
      expect(fnc).toThrow(/.*/)
    })

    it('02: sheet missing', () => {
      Comp = CompCreator({}, null)
      const fnc = () => mount(<Comp />)
      expect(fnc).toThrow(/.*/)
    })

    it('03: just div', () => {
      Comp = CompCreator({ defaultSheet: { root: {} } }, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('04: with sheet', () => {
      Comp = CompCreator({ defaultSheet: { root: { color: 'red' } } }, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('05: with sheet override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('06: with classes override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('07: with classNameX override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={{ color: 'yellow' } as any} />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('08: with styleX override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={{ color: 'yellow' } as any} styleX={{ color: 'maroon' } as any} />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('09: theme, with sheet', () => {
      Comp = CompCreator({ defaultSheet: theme => ({ root: { color: theme.primaryColor } }) }, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('10: theme, with sheet override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: theme => ({ root: { color: theme.primaryColor } }) }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('11: theme, with classes override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={theme => ({ root: { color: theme.primaryColor } })} />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('12: theme, with classNameX override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={theme => ({ color: theme.primaryColor }) as any} />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('13: theme, with styleX override', () => {
      Comp = CompCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={{ color: 'yellow' } as any} styleX={theme => ({ color: theme.primaryColor }) as any} />)
      expect(wrapper.container).toMatchSnapshot()
    })


    it('14: default props', () => {
      Comp = CompCreator(
        { defaultProps: { p1: 'defaultProp' } },
        null
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('15: override props', () => {
      Comp = CompCreator(
        { defaultProps: { p1: 'defaultProp' } },
        { overrideProps: { p1: 'overrideProp' } }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('16: props', () => {
      Comp = CompCreator(
        { defaultProps: { p1: 'defaultProp' } },
        { overrideProps: { p1: 'overrideProp' } }
      )
      const wrapper = mount(<Comp p1='componentProp' />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('17: theme, default props', () => {
      Comp = CompCreator(
        { defaultProps: { p1: 'defaultProp', themedProps: theme => ({p1: theme.p1Prop}) } },
        null
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('18: theme, override props', () => {
      Comp = CompCreator(
        { defaultProps: { p1: 'defaultProp' } },
        { overrideProps: { p1: 'overrideProp', themedProps: theme => ({p1: theme.p1Prop}) } }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
    })

    it('19: theme, props', () => {
      Comp = CompCreator(
        { defaultProps: { p1: 'defaultProp' } },
        { overrideProps: { p1: 'overrideProp' } }
      )
      const wrapper = mount(<Comp p1='componentProp' themedProps={theme => ({p1: theme.p1Prop})} />)
      expect(wrapper.container).toMatchSnapshot()
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

