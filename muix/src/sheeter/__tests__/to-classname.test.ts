import { atomizeRuleset, platform, toClassNamesWithQuery, $if } from "reactxx-sheeter"
import { initPlatform } from "./init-platform"
import { TSheeter, TAtomize, TVariants } from 'reactxx-typings';


describe("TO CLASSNAMES", () => {
  const dump = (ruleset: TAtomize.Ruleset) => {
    expect(ruleset).toMatchSnapshot()
    const won = platform.applyLastwinsStrategy(ruleset)
    expect(won).toMatchSnapshot()
    expect(platform.finalizeClassName(won)).toMatchSnapshot()
  }

  const sheetQuery = (opened: boolean) => ({ opened, theme: null })

  const query = (opened: boolean, ...ruleset: (TSheeter.Ruleset | TAtomize.Ruleset)[]) =>
    dump(toClassNamesWithQuery(sheetQuery(opened), ...ruleset))

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb, true))
    let ruleset
    it("01: null", () => dump(toClassNamesWithQuery(null, null)))
    it("02: null, {}, undefined", () => dump(toClassNamesWithQuery(null, null, {}, undefined)))
    it("03: mixed", () => dump(toClassNamesWithQuery(null,
      { color: 'red' },
      atomizeRuleset([{ color: 'blue' }, { color: 'yellow' }], null, 'root'),
      toClassNamesWithQuery(null, { color: 'green' })
    )))
    it("04: query => opened", () => query(true,
      $if(p => p.opened, { color: 'red' }),
      $if(p => !p.opened, { color: 'blue' }),
    ))
    it("05: query => closed", () => query(false,
      $if(p => p.opened, { color: 'red' }),
      $if(p => !p.opened, { color: 'blue' }),
    ))
    it("06: query => closed => pre-atomized", () => query(false, atomizeRuleset([
      $if(p => p.opened, { color: 'red' }),
      $if(p => !p.opened, { color: 'blue' }),
    ])))
    it("07: query => closed => pre-queried", () => query(false,
      toClassNamesWithQuery(sheetQuery(false),
        $if(p => p.opened, { color: 'red' }),
        $if(p => !p.opened, { color: 'blue' }),
      )
    ))
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
