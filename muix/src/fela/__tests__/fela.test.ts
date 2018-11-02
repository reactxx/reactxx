import Fela from "reactxx-fela"

test("fela", () => {
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

  window.__TRACE__ = true

  Fela.initFela$Web()
  let css = Fela.getRenderer().renderRuleEx(classNames, 'root')
  const res = Fela.dumpAtomized(css)
  expect(res).toMatchSnapshot()

  Fela.initFela$Web()
  css = Fela.getRenderer().renderRuleEx(classNames, 'root')
  expect(Fela.dumpAtomized(css)).toMatchSnapshot()
})
