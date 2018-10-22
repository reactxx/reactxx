import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, ts, Shape } from "reactxx-tests";

describe("ATOMIZE SHEET", () => {
  const createSheet = () =>
    (ts.sheet = {
      root: (ts.view = {
        margin: 4,
        padding: 4,
        $web: (ts.web = {
          margin: 10
        }),
        $native: (ts.nativeView = {
          padding: 10
        })
      }),
      label: (ts.text = [
        {
          color: "blue"
        }
      ]),
      webOnly: {
        $web: (ts.web = {
          color: "red"
        })
      },
      nativeOnly: {
        $native: (ts.nativeView = {
          margin: 20
        })
      }
    });
  it("NATIVE, DEVELOPMENt", () => {
    initPlatform(false);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchSnapshot();
  });
  it("NATIVE, PRODUCTION", () => {
    initPlatform(false, false);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchSnapshot();
  });
  it("WEB DEVELOPMENT", () => {
    initPlatform(true);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchSnapshot();
  });
  it("WEB PRODUCTION", () => {
    initPlatform(true, false);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchSnapshot();
  });
});
