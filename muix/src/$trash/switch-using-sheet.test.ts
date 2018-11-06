import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape } from "reactxx-tests";
import { createSheet, query } from "./switch-sheet.test";

describe("SWITCH using sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames(
      "NATIVE, OPENED",
      query(true),
      [sheet.root, sheet.nativeOnly],
      res =>
        res.toMatchSnapshot()
    );

    toClassNames(
      "NATIVE, CLOSED",
      query(false),
      [sheet.root, sheet.nativeOnly],
      res =>
        res.toMatchSnapshot()
    );
  });
  it("WEB", () => {
    initPlatform(true);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames("WEB, OPENED", query(true), [sheet.root, sheet.webOnly], res =>
      res.toMatchSnapshot()
    );

    toClassNames(
      "WEB, CLOSED",
      query(false),
      [sheet.root, sheet.webOnly],
      res =>
        res.toMatchSnapshot()
    );
  });
});
