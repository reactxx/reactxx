import { atomizeRuleset, toClassNamesWithQuery, $if } from "reactxx-sheeter"
import { initPlatform, dump } from "./init-platform"
import { TAtomize } from 'reactxx-typings';


describe("TO CLASSNAMES", () => {

  type Par = { opened:boolean, theme: null }
  const sheetQuery = (opened: boolean) => ({ opened, $theme: null })
  const query = (opened: boolean, ...ruleset: TAtomize.Item[]) => dump(toClassNamesWithQuery(sheetQuery(opened), ...ruleset))

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01: null", () => dump(toClassNamesWithQuery(null, null)))
    it("02: null, {}, undefined", () => dump(toClassNamesWithQuery(null, null, {}, undefined)))
    it("03: mixed", () => dump(toClassNamesWithQuery(null,
      { color: 'red' }, // ruleset source
      atomizeRuleset([{ color: 'blue' }, { color: 'yellow' }], null, 'root'), // atomized ruleset
      $if(p => true, { color: 'maroon' }), // temporary item
      toClassNamesWithQuery(null, { color: 'green' }) // atomized ruleset
    )))
    it("04: query => opened", () => query(true,
      $if<Par>(p => p.opened, { color: 'red' }),
      $if<Par>(p => !p.opened, { color: 'blue' }),
    ))
    it("05: query => closed", () => query(false,
      $if<Par>(p => p.opened, { color: 'red' }),
      $if<Par>(p => !p.opened, { color: 'blue' }),
    ))
    it("06: query => closed => pre-atomized", () => query(false, atomizeRuleset([
      $if<Par>(p => p.opened, { color: 'red' }),
      $if<Par>(p => !p.opened, { color: 'blue' }),
    ])))
    it("07: query => closed => pre-queried", () => query(false,
      toClassNamesWithQuery(sheetQuery(false),
        $if<Par>(p => p.opened, { color: 'red' }),
        $if<Par>(p => !p.opened, { color: 'blue' }),
      )
    ))
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
