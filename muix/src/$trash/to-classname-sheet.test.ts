import { atomizeSheet } from "reactxx-styler";
import { initPlatform, ts, Shape } from "reactxx-tests";

export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = [
      {
        margin: 4,
        padding: 4,
        $web: (ts.web = {
          margin: 10
        })
      }, {
        $native: (ts.nativeView = {
          padding: 10
        })
      }
    ]),
    label: (ts.text = {
      color: "blue"
    }),
    webOnly: {
      $web: (ts.web = {
        color: "red",
        padding: 20
      })
    },
    nativeOnly: {
      $native: (ts.nativeView = {
        margin: 20
      })
    }
  });

describe("TO CLASSNAMES, sheet", () => {
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
