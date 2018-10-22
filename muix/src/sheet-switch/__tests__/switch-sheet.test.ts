import { TVariants } from "reactxx-typings";
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
    root: (ts.view = {
      $switch: {
        isOpened: {
          backgroundColor: "red",
          $switch: {
            isOpened: {
              borderColor: "cyan"
            }
          }
        }
      },
      $web: (ts.web = {
        ":hover": {
          $switch: {
            isClosed: [
              {
                backgroundColor: "green"
              }
            ]
          }
        }
      }),
      $native: (ts.nativeView = {
        $switch: {
          isOpened: {
            backgroundColor: "brown"
          }
        }
      })
    }),
    label: {},
    webOnly: {
      $web: {
        ":hover": {
          $switch: {
            isOpened: {
              backgroundColor: "yellow"
            }
          }
        }
      }
    },
    nativeOnly: {}
  });
export const query = (opened: boolean) =>
  ({
    $switch: {
      isOpened: opened,
      isClosed: !opened
    }
  } as TVariants.Query<Shape>);
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
});
