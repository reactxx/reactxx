import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape, setActWidth } from "reactxx-tests";
import { createSheet, query } from "../sheet-widths/__tests__/widths-sheet.test";

describe("SWITCH using sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);

    const sheet = atomizeSheet<Shape>(createSheet());

    setActWidth(300)
    toClassNames(
      "NATIVE, MOBILE",
      query(true),
      [sheet.root, sheet.nativeOnly],
      res =>
        res.toMatchSnapshot()
    );

    setActWidth(800)
    toClassNames(
      "NATIVE, TABLET",
      query(false),
      [sheet.root, sheet.nativeOnly],
      res =>
        res.toMatchSnapshot()
    );
  });
  it("WEB", () => {
    initPlatform(true);

    const sheet = atomizeSheet<Shape>(createSheet());

    setActWidth(300)
    toClassNames("WEB, MOBILE", query(true), [sheet.root, sheet.webOnly], res =>
      res.toMatchSnapshot()
    );

    setActWidth(800)
    toClassNames(
      "WEB, TABLET",
      query(false),
      [sheet.root, sheet.webOnly],
      res =>
        res.toMatchSnapshot()
    );
  });
});
