import { atomizeRuleset } from "reactxx-styler";
import { initPlatform, Shape, ts } from "reactxx-tests";
import {$C} from 'reactxx-sheet-if'

describe("IF", () => {

  let $width
  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset: any = {
      $IF: v => true,
      [$width(1024)]: {

      },
      $web: {
        ':hover': {
          $IF: v => true  
        },
        $IF: v => true
      }
    }

    it("01", () => {
      ruleset = atomizeRuleset<'Text', Shape>([
        {
        }
      ])

      expect(ruleset).toMatchSnapshot()
    })

}

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))
});
