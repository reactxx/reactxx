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
        backgroundColor: "blue"
      },
      {
        $web: [
          {
            ":hover": {
              color: "red",
            }
          },
          atomizeRuleset([
            {
              $web: {
                ":active": {
                  marginTop: 11,
                  marginBottom: 11
                }
              }
            }
          ], ''),
          toClassNamesWithQuery(null, [
            {
              paddingTop: 11,
              paddingBottom: 11
            }
          ]) as any
        ]
      },
      atomizeRuleset([
        {
          marginTop: 21,
          marginBottom: 21
        }
      ], '') as any,
      toClassNamesWithQuery(null, [
        {
          paddingTop: 22,
          paddingBottom: 22
        }
      ]) as any
    ]),
    label: toClassNamesWithQuery(null, {
      paddingTop: 31,
      paddingBottom: 31
    }) as any,
    webOnly: {
      $web: atomizeRuleset({
        marginTop: 41,
        marginBottom: 41
      }, '') as any
    },
    nativeOnly: {}
  });

describe("SWITCH define sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet() as any);
    expect(sheet).toMatchSnapshot();
  });
  it("WEB", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet() as any);
    expect(sheet).toMatchSnapshot();
  });
});
