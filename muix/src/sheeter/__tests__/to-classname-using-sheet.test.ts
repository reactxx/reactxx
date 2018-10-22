import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape } from "reactxx-tests";
import { createSheet } from "./to-classname-sheet.test";

describe("TO CLASSNAMES, using sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames(
      "NATIVE: root, label, nativeOnly",
      null,
      [sheet.root, sheet.label, sheet.nativeOnly],
      res =>
        res.toMatchSnapshot()
    );

    toClassNames(
      "NATIVE: nativeOnly, root",
      null,
      [sheet.nativeOnly, sheet.root],
      res =>
        res.toMatchSnapshot()
    );
  });
  it("WEB", () => {
    initPlatform(true);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames(
      "WEB: root, label, webOnly",
      null,
      [sheet.root, sheet.label, sheet.webOnly],
      res =>
        res.toMatchSnapshot()
    );

    toClassNames("WEB: webOnly, root", null, [sheet.webOnly, sheet.root], res =>
      res.toMatchSnapshot()
    );
  });
});
