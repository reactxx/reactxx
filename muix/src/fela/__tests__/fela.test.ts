import Fela from "reactxx-fela"

describe("FELA", () => {

  const classNames = {
    color: "red",
    margin: 10,
    ":hover": {
      margin: 5,
      "@media (min-width: 768px)": {
        height: 100,
        ":active": {
          width: 700,
          color: "red"
        }
      }
    }
  }

  const doTest = (isTrace: boolean) => {
    it('01 ', () => {
      window.__TRACE__ = isTrace ? {} : null
      Fela.initFela$Web()
      const css = Fela.getRenderer().renderRuleEx(classNames, 'root')
      const res = Fela.dataTrace(css)
      expect(res).toMatchSnapshot()
    })

    it('02 ', () => {
      window.__TRACE__ = isTrace ? {} : null
      Fela.initFela$Web()
      const css1 = Fela.getRenderer().renderRuleEx({ color: 'red', ':hover': { çolor: 'green', ':active': { color: 'blue' } } }, 'red-variant')
      expect(Fela.dataTrace(css1)).toMatchSnapshot()

      const css2 = Fela.getRenderer().renderRuleEx({ color: 'maroon', ':hover': { çolor: 'black', ':active': { color: 'white' } } }, 'maroon-variant')
      expect(Fela.dataTrace(css2)).toMatchSnapshot()

      let res: any = {}
      let c = css1.concat(css2)
      for (let i = c.length - 1; i >= 0; i--)
        Fela.getRenderer().lastWin(c[i], res)
      expect(Fela.dataTrace(res.items)).toMatchSnapshot()

      res = {}
      c = css2.concat(css1)
      for (let i = c.length - 1; i >= 0; i--)
        Fela.getRenderer().lastWin(c[i], res)
      expect(Fela.dataTrace(res.items)).toMatchSnapshot()

      const css4 = Fela.getRenderer().finalizeClassName(res.items)
      expect(css4).toMatchSnapshot()
    })

  }

  describe("## NO TRACE ##", () => doTest(false))
  describe("## TRACE ##", () => doTest(true))

})
