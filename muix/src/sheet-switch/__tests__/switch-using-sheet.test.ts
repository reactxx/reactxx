import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape } from "reactxx-tests";
import { createSheet, query } from "./switch-sheet.test";

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
    "backgroundColor: blue /*root/$sheetSwitch.isClosed*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$sheetSwitch.isClosed",
      "value": "blue",
    },
  },
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  Object {
    "backgroundColor": "blue",
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
    "backgroundColor: red /*root/$sheetSwitch.isOpened*/",
    "borderColor: cyan /*root/$sheetSwitch.isOpened/$sheetSwitch.isOpened*/",
    "backgroundColor: brown /*root/$native/$sheetSwitch.isOpened*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$native/$sheetSwitch.isOpened",
      "value": "brown",
    },
    "borderColor": Object {
      "tracePath": "root/$sheetSwitch.isOpened/$sheetSwitch.isOpened",
      "value": "cyan",
    },
  },
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  Object {
    "backgroundColor": "brown",
    "borderColor": "cyan",
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
    ".c { background-color:blue /*root/$sheetSwitch.isClosed*/ }",
    undefined,
    ".d:hover { background-color:green /*root/$web/:hover/$sheetSwitch.isClosed[0]*/ }",
    undefined,
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".d:hover { background-color:green /*root/$web/:hover/$sheetSwitch.isClosed[0]*/ }",
    ".c { background-color:blue /*root/$sheetSwitch.isClosed*/ }",
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
    ".a { background-color:red /*root/$sheetSwitch.isOpened*/ }",
    ".b { border-color:cyan /*root/$sheetSwitch.isOpened/$sheetSwitch.isOpened*/ }",
    undefined,
    undefined,
    ".e:hover { background-color:yellow /*webOnly/$web/:hover/$sheetSwitch.isOpened*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".e:hover { background-color:yellow /*webOnly/$web/:hover/$sheetSwitch.isOpened*/ }",
    ".b { border-color:cyan /*root/$sheetSwitch.isOpened/$sheetSwitch.isOpened*/ }",
    ".a { background-color:red /*root/$sheetSwitch.isOpened*/ }",
  ],
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  "e b a",
]
`)
    );
  });
});
