import { TSheeter } from "reactxx-typings";
import {
  atomizeSheet,
  atomizeRuleset,
  toClassNamesWithQuery
} from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";

export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = [
      {
        $switch: {
          isClosed: [
            atomizeRuleset({
              $switch: {
                isOpened: {
                  padding: 11
                }
              },
              padding: 22
            } as TSheeter.RulesetOrAtomized, ''),
            toClassNamesWithQuery(null, [
              {
                padding: 33
              }
            ])
          ]
        }
      }
    ]),
    label: {},
    webOnly: {},
    nativeOnly: {}
  });

export const createSheetWithPseudo = () =>
  (ts.sheet = {
    root: (ts.view = [
      {
        $web: {
          ":active": {
            $switch: {
              isClosed: [
                atomizeRuleset({
                  $switch: {
                    isOpened: {
                      padding: 44
                    }
                  },
                  padding: 55
                } as TSheeter.RulesetOrAtomized, ''),
                toClassNamesWithQuery(null, [
                  {
                    padding: 66
                  }
                ])
              ]
            }
          }
        }
      }
    ]),
    label: {},
    webOnly: {},
    nativeOnly: {}
  });

describe("SWITCH define sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet());
    expect(sheet).toMatchSnapshot();
  });
  it("WEB", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet());
    expect(sheet).toMatchSnapshot();
  });
  it("WEB with pseudo: WRONG RESULT", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheetWithPseudo());
    expect(sheet).toMatchSnapshot();
  });
});
