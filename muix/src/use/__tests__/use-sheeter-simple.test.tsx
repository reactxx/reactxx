/** @jsx platform.createElement */

import { platform } from "reactxx-sheeter"

import { TSheeter, TWithStyles, TComponents } from 'reactxx-typings'
import { useSheeter } from "reactxx-use"

import { initPlatform, mount } from "./init-platform"

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
      platform.getDefaultTheme = () => ({
        primaryColor: 'gray',
        p1Prop: 'themeProp'
      })
    })

    const compCreator = (
      config: TWithStyles.ComponentConfig<Shape>,
      configOverride: TWithStyles.ComponentConfigOverride<Shape>,
      displayName?: 'Comp'
    ) => {
      const res: TComponents.SFC<Shape> = props => {
        try {
          const { toClassNames, propsCode, classes, classNameX, styleX
          } = useSheeter(props, config, displayName, configOverride)
          
          const root = toClassNames(classes.root, classNameX)
          return <div {...propsCode} classNameX={root} styleX={styleX as any} />
        } catch {
          return <div>ERROR</div>
        }
      }
      res.displayName = displayName
      res['$c$'] = true
      return res
    }


    it('01: config NULL', () => {
      const Comp = compCreator(null, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('02: sheet missing', () => {
      const Comp = compCreator({}, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('03: just div', () => {
      const Comp = compCreator({ defaultSheet: { root: {} } }, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('04: with sheet', () => {
      const Comp = compCreator({ defaultSheet: { root: { color: 'red' } } }, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('05: with sheet override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('06: with classes override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('07: with classNameX override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={{ color: 'yellow' } as any} />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('08: with styleX override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={{ color: 'yellow' } as any} styleX={{ color: 'maroon' } as any} />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('09: theme, with sheet', () => {
      const Comp = compCreator({ defaultSheet: theme => ({ root: { color: theme.primaryColor } }) }, null)
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('10: theme, with sheet override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: theme => ({ root: { color: theme.primaryColor } }) }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('11: theme, with classes override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={theme => ({ root: { color: theme.primaryColor } })} />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('12: theme, with classNameX override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={theme => ({ color: theme.primaryColor }) as any} />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('13: theme, with styleX override', () => {
      const Comp = compCreator(
        { defaultSheet: { root: { color: 'red' } } },
        { overrideSheet: { root: { color: 'green' } } }
      )
      const wrapper = mount(<Comp classes={{ root: { color: 'blue' } }} classNameX={{ color: 'yellow' } as any} styleX={theme => ({ color: theme.primaryColor }) as any} />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })


    it('14: default props', () => {
      const Comp = compCreator(
        {
          defaultSheet: { root: {} },
          defaultProps: { p1: 'defaultProp' }
        },
        null
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('15: override props', () => {
      const Comp = compCreator(
        {
          defaultSheet: { root: {} },
          defaultProps: { p1: 'defaultProp' }
        },
        { overrideProps: { p1: 'overrideProp' } }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('16: props', () => {
      const Comp = compCreator(
        {
          defaultSheet: { root: {} },
          defaultProps: { p1: 'defaultProp' }
        },
        { overrideProps: { p1: 'overrideProp' } }
      )
      const wrapper = mount(<Comp p1='componentProp' />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('17: theme, default props', () => {
      const Comp = compCreator(
        {
          defaultSheet: { root: {} },
          defaultProps: { p1: 'defaultProp', themedProps: theme => ({ p1: theme.p1Prop }) }
        },
        null
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('18: theme, override props', () => {
      const Comp = compCreator(
        {
          defaultSheet: { root: {} },
          defaultProps: { p1: 'defaultProp' }
        },
        { overrideProps: { p1: 'overrideProp', themedProps: theme => ({ p1: theme.p1Prop }) } }
      )
      const wrapper = mount(<Comp />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

    it('19: theme, props', () => {
      const Comp = compCreator(
        {
          defaultSheet: { root: {} },
          defaultProps: { p1: 'defaultProp' }
        },
        { overrideProps: { p1: 'overrideProp' } }
      )
      const wrapper = mount(<Comp p1='componentProp' themedProps={theme => ({ p1: theme.p1Prop })} />)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

