import { atomizeRuleset } from "reactxx-styler";
import { initPlatform, Shape, ts } from "reactxx-tests";

describe("SWITCH", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 isOpened: color: 'red', isClosed: color: 'blue'", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $switch: {
          isOpened: {
            color: 'red'
          },
          isClosed: {
            color: 'blue'
          },
        }
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("02 :hover => isOpened => :active => color: 'red'", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $web: {
          ':hover': {
            $switch: {
              isOpened: {
                $web: {
                  ':active': {
                    color: 'red'
                  }
                }
              }
            }
          }
        }
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("03 atomizeRuleset(isOpened => atomizeRuleset(color: 'red), isClosed => atomizeRuleset(color: 'green'))", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $switch: {
          isOpened: atomizeRuleset({ color: 'red' }) as any,
          isClosed: atomizeRuleset({ color: 'green' }) as any,
        }
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("04 variant's order: black-red-green-yellow-blue-brown", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $web: {
          color: 'blue',
          $switch: {
            isOpened: {
              color: 'brown',
            }
          }
        },
        $switch: {
          isOpened: {
            color: 'red',
            $web: {
              color: 'yellow'
            },
            $switch: {
              isClosed: {
                color: 'green',
              }
            }
          },
        },
        color: 'black'
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("05 variant's order with array: $web => brown-blue-yellow-red-black", () => {
      ruleset = atomizeRuleset<'Text', Shape>([{
        $web: [{
          $switch: {
            isOpened: {
              color: 'brown',
            }
          }
        }, {
          color: 'blue',
        }],
      }, {
        $switch: {
          isOpened: [{
            $web: {
              color: 'yellow'
            },
          }, {
            color: 'red',
          }],
        },

      }, {
        color: 'black'
      }])
      expect(ruleset).toMatchSnapshot()
    })

    it("06 nesting PSEUDO and $switch", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $web: {
          ':hover': {
            $switch: {
              isOpened: {
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
