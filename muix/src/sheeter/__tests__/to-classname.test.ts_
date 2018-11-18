import { atomizeRuleset, platform, toClassNamesWithQuery } from "reactxx-sheeter"
import { initPlatform, ts, Shape } from "reactxx-tests"
import { TSheeter, TAtomize, TVariants } from 'reactxx-typings';


describe("TO CLASSNAMES", () => {
  const dump = (ruleset: TAtomize.Ruleset) => {
    expect(ruleset).toMatchSnapshot()
    const won = platform.applyLastwinsStrategy(ruleset)
    expect(won).toMatchSnapshot()
    expect(platform.finalizeClassName(won)).toMatchSnapshot()
  }

  const sheetQuery = (isOpened: boolean) => ({ propsCode: { sheetQuery: { $switch: { isOpened: isOpened, isClosed: !isOpened } } as TVariants.Query<Shape> } })

  const query = (isOpened: boolean, ruleset: TSheeter.Ruleset<'Text', Shape> | TAtomize.Ruleset) =>
    dump(toClassNamesWithQuery(sheetQuery(isOpened), ruleset))

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb, true))
    let ruleset
    it("01: null", () => dump(toClassNamesWithQuery(null, null)))
    it("02: null, {}, undefined", () => dump(toClassNamesWithQuery(null, [null, {}, undefined])))
    it("03: mixed", () => dump(toClassNamesWithQuery(null, [
      { color: 'red' },
      atomizeRuleset([{ color: 'blue' }, { color: 'yellow' }], null, 'root'),
      toClassNamesWithQuery(null, { color: 'green' })
    ])))
    it("04: query => opened", () => query(true, {
      $switch: {
        isOpened: { color: 'red' },
        isClosed: { color: 'blue' },
      }
    }))
    it("05: query => closed", () => query(false, {
      $switch: {
        isOpened: { color: 'red' },
        isClosed: { color: 'blue' },
      }
    }))
    it("06: query => closed => pre-atomized", () => query(false, atomizeRuleset<'Text', Shape>({
      $switch: {
        isOpened: { color: 'red' },
        isClosed: { color: 'blue' },
      }
    })))
    it("07: query => closed => pre-queried", () => query(false, toClassNamesWithQuery(sheetQuery(false), {
      $switch: {
        isOpened: { color: 'red' },
        isClosed: { color: 'blue' },
      }
    } as TSheeter.Ruleset<'Text', Shape>)))
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
