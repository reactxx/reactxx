import { initPlatform, dump } from "./init-platform"
import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'

import { getTypedUtils } from 'reactxx-sheeter'

const { $themed, $if, $web, $native, $rules, $toClassNames, $atomizeRuleset 
} = getTypedUtils<{ opened: boolean }, { primary }>()



describe("TO CLASSNAMES", () => {

  type Par = { opened:boolean, theme: null }
  const sheetQuery = (opened: boolean) => ({ opened })
  const query = (opened: boolean, ...ruleset: TTyped.Ruleset[]) => dump($toClassNames(sheetQuery(opened), ...ruleset))

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01: null", () => dump($toClassNames(null, null)))
    it("02: null, {}, undefined", () => dump($toClassNames(null, null, {}, undefined)))
    it("03: mixed", () => dump($toClassNames<T>(null,
      { color: 'red' }, // ruleset source
      $atomizeRuleset<T>([{ color: 'blue' }, { color: 'yellow' }], null, 'root'), // atomized ruleset
      $if<T>(p => true, { color: 'maroon' }), // temporary item
      $toClassNames<T>(null, { color: 'green' }) // atomized ruleset
    )))
    it("04: query => opened", () => query(true,
      $if(p => p.opened, { color: 'red' }),
      $if(p => !p.opened, { color: 'blue' }),
    ))
    it("05: query => closed", () => query(false,
      $if(p => p.opened, { color: 'red' }),
      $if(p => !p.opened, { color: 'blue' }),
    ))
    it("06: query => closed => pre-atomized", () => query(false, $atomizeRuleset<T>([
      $if<T>(p => p.opened, { color: 'red' }),
      $if<T>(p => !p.opened, { color: 'blue' }),
    ])))
    it("07: query => closed => pre-queried", () => query(false,
      $toClassNames<T>(sheetQuery(false),
        $if<T>(p => p.opened, { color: 'red' }),
        $if<T>(p => !p.opened, { color: 'blue' }),
      )
    ))
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
