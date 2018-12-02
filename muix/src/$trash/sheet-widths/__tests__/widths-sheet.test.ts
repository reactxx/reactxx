import { atomizeRuleset } from "reactxx-styler";
import { initPlatform, Shape } from "reactxx-tests";

describe("WIDTHS", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 empty", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $widths: {
          ['0-640']: null,
          ['640-1024']: [null, {}, undefined],
          ['1024-']: {}
        },
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("02 simple", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $widths: {
          ['0-640']: {
            margin: 0,
          },
          ['640-1024']: [{
            margin: 10
          }],
          ['1024-']: [{
            margin: 20
          }, {
            margin: 10
          }]
        },
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("03 WEB only: with PSEUDO", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $widths: {
          ['0-640']: {
            $web: {
              ':hover': {
                margin: 10
              }
            }
          },
          ['640-1024']: {
            color: 'red',
            $web: {
              backgroundColor: 'gray',
              ':hover': {
                padding: 10,
                ':active': {
                  margin: 10
                }
              }
            }
          }
        },
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("04 WEB only: nesting PSEUDO and $widths", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $web: {
          ':hover': {
            $widths: {
              ['0-640']: {
                $web: {
                  ':active': {
                    margin: 10
                  }
                }
              },
            }
          }
        }
      })
      expect(ruleset).toMatchSnapshot()
    })

  }
  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))
});
