import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape } from "reactxx-tests";
import { createSheet, query } from "./widths-sheet.test";

/*
describe("SWITCH using sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames('NATIVE, OPENED', query(true), [
      sheet.root,
      sheet.nativeOnly
    ], res => res.toMatchInlineSnapshot())

    toClassNames('NATIVE, CLOSED', query(false), [
      sheet.root,
      sheet.nativeOnly
    ], res => res.toMatchInlineSnapshot())
  })
  it("WEB", () => {
    initPlatform(true);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames('WEB, OPENED', query(true), [
      sheet.root,
      sheet.webOnly
    ], res => res.toMatchInlineSnapshot())

    toClassNames('WEB, CLOSED', query(false), [
      sheet.root,
      sheet.webOnly
    ], res => res.toMatchInlineSnapshot())
  });

});
*/

describe("SWITCH using sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames(
      "NATIVE, OPENED",
      query(true),
      [sheet.root, sheet.nativeOnly],
      res =>
        res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  NATIVE, OPENED
#
##########################################
##########################################
",
  "
******************************************
*  QUERY TO STHEET
******************************************
",
  Array [
    "backgroundColor: blue /*root/$sheetSwitch.mobileWidth*/",
    "backgroundColor: cyan /*root/$sheetSwitch.tabletWidth*/",
    "backgroundColor: green /*root/$sheetSwitch.desktopWidth*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$sheetSwitch.desktopWidth",
      "value": "green",
    },
  },
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  Object {
    "backgroundColor": "green",
  },
]
`)
    );

    toClassNames(
      "NATIVE, CLOSED",
      query(false),
      [sheet.root, sheet.nativeOnly],
      res =>
        res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  NATIVE, CLOSED
#
##########################################
##########################################
",
  "
******************************************
*  QUERY TO STHEET
******************************************
",
  Array [
    "backgroundColor: blue /*root/$sheetSwitch.mobileWidth*/",
    "backgroundColor: cyan /*root/$sheetSwitch.tabletWidth*/",
    "backgroundColor: green /*root/$sheetSwitch.desktopWidth*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$sheetSwitch.desktopWidth",
      "value": "green",
    },
  },
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  Object {
    "backgroundColor": "green",
  },
]
`)
    );
  });
  it("WEB", () => {
    initPlatform(true);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames("WEB, OPENED", query(true), [sheet.root, sheet.webOnly], res =>
      res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  WEB, OPENED
#
##########################################
##########################################
",
  "
******************************************
*  QUERY TO STHEET
******************************************
",
  Array [
    ".a { background-color:blue /*root/$sheetSwitch.mobileWidth*/ }",
    ".b { background-color:cyan /*root/$sheetSwitch.tabletWidth*/ }",
    ".c { background-color:green /*root/$sheetSwitch.desktopWidth*/ }",
    undefined,
    ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.mobileWidth*/ }",
    ".e:hover { background-color:lightcyan /*root/$web/:hover/$sheetSwitch.tabletWidth*/ }",
    ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.desktopWidth*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.desktopWidth*/ }",
    ".c { background-color:green /*root/$sheetSwitch.desktopWidth*/ }",
  ],
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  "d c",
]
`)
    );

    toClassNames(
      "WEB, CLOSED",
      query(false),
      [sheet.root, sheet.webOnly],
      res =>
        res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  WEB, CLOSED
#
##########################################
##########################################
",
  "
******************************************
*  QUERY TO STHEET
******************************************
",
  Array [
    ".a { background-color:blue /*root/$sheetSwitch.mobileWidth*/ }",
    ".b { background-color:cyan /*root/$sheetSwitch.tabletWidth*/ }",
    ".c { background-color:green /*root/$sheetSwitch.desktopWidth*/ }",
    undefined,
    ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.mobileWidth*/ }",
    ".e:hover { background-color:lightcyan /*root/$web/:hover/$sheetSwitch.tabletWidth*/ }",
    ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.desktopWidth*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.desktopWidth*/ }",
    ".c { background-color:green /*root/$sheetSwitch.desktopWidth*/ }",
  ],
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  "d c",
]
`)
    );
  });
});
