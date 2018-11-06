import {
  atomizeRuleset as atomizeRuleset,
  toClassNamesWithQuery as toClassNamesWithQuery
} from "reactxx-sheeter"
import { initPlatform, Shape, ts } from "reactxx-tests"

describe("ATOMIZE RULESET", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let ruleset

    it("01 (null)", () => {
      ruleset = atomizeRuleset(null)
      expect(ruleset).toMatchSnapshot()
    })

    it("02 ({})", () => {
      ruleset = atomizeRuleset({})
      expect(ruleset).toMatchSnapshot()
    })

    it("03 ([null, undefined, {}])", () => {
      ruleset = atomizeRuleset([null, undefined, {}])
      expect(ruleset).toMatchSnapshot()
    })

    it("04 ({ color: 'red', margin: 0 })", () => {
      ruleset = atomizeRuleset({ color: 'red', margin: 0 })
      expect(ruleset).toMatchSnapshot()
    })

    it("05 ([{ color: 'red' }, { margin: 0 }])", () => {
      ruleset = atomizeRuleset([{ color: 'red' }, { margin: 0 }])
      expect(ruleset).toMatchSnapshot()
    })

    it("06 (...$web: { color: 'green' }, $native: { color: 'blue' })", () => {
      ruleset = atomizeRuleset({
        color: 'red',
        $web: { color: 'green' },
        $native: { color: 'blue' },
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("07 isOpened: color: 'red', isClosed: color: 'blue'", () => {
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

    it("08 :hover => isOpened => :active => color: 'red'", () => {
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

    it("09 atomizeRuleset(atomizeRuleset({color: 'red'", () => {
      ruleset = atomizeRuleset(atomizeRuleset({
        color: 'red'
      }) as any)
      expect(ruleset).toMatchSnapshot()
    })

    it("10 atomizeRuleset({$web: atomizeRuleset({ color: 'red', $native: atomizeRuleset({ color: 'green'", () => {
      ruleset = atomizeRuleset({
        $web: atomizeRuleset({ color: 'red' }) as any,
        $native: atomizeRuleset({ color: 'green' }) as any
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("11 atomizeRuleset(isOpened => atomizeRuleset(color: 'red), isClosed => atomizeRuleset(color: 'green'))", () => {
      ruleset = atomizeRuleset<'Text', Shape>({
        $switch: {
          isOpened: atomizeRuleset({ color: 'red' }) as any,
          isClosed: atomizeRuleset({ color: 'green' }) as any,
        }
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("12 variant's order: black-red-green-yellow-blue-brown", () => {
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

    it("13 variant's order with array: $web => brown-blue-yellow-red-black", () => {
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

    it("14 ERROR for atomizeRuleset({:hover': atomizeRuleset(...", () => {
      ruleset = atomizeRuleset({
        $web: {
          ':hover': atomizeRuleset({ color: 'red' }) as any,
        }
      })
      expect(ruleset).toMatchSnapshot()
    })

    it("15 ERROR for atomizeRuleset({:hover': [ARRAY]", () => {
      ruleset = atomizeRuleset({
        $web: {
          ':hover': [
            { color: 'red' },
            { margin: 10 }
          ] as any
        }
      })
      expect(ruleset).toMatchSnapshot()
    })

  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})

