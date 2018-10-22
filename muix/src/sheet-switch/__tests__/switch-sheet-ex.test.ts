import { TSheeter } from "reactxx-typings";
import {
  atomizeSheet,
  atomizeRuleset,
  toClassNamesWithQuery
} from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";

import { sheetSwitch_registerVariantHandler } from "../index";

sheetSwitch_registerVariantHandler();

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
            } as TSheeter.RulesetOrAtomized),
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
                      padding: 11
                    }
                  },
                  padding: 22
                } as TSheeter.RulesetOrAtomized),
                toClassNamesWithQuery(null, [
                  {
                    padding: 33
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
  it("WEB", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet(), null, 'sheet');
    expect(sheet).toMatchSnapshot();
  });
  it("WEB with pseudo: WRONG RESULT", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheetWithPseudo(), null, 'sheet');
    expect(sheet).toMatchSnapshot();
  });
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet(), null, 'sheet');
    expect(sheet).toMatchSnapshot();
  });
});
