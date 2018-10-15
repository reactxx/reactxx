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
    "backgroundColor: blue /*root/$switch.isClosed*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$switch.isClosed",
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
    "backgroundColor: red /*root/$switch.isOpened*/",
    "borderColor: cyan /*root/$switch.isOpened/$switch.isOpened*/",
    "backgroundColor: brown /*root/$native/$switch.isOpened*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$native/$switch.isOpened",
      "value": "brown",
    },
    "borderColor": Object {
      "tracePath": "root/$switch.isOpened/$switch.isOpened",
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
    ".c { background-color:blue /*root/$switch.isClosed*/ }",
    undefined,
    ".d:hover { background-color:green /*root/$web/:hover/$switch.isClosed[0]*/ }",
    undefined,
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".d:hover { background-color:green /*root/$web/:hover/$switch.isClosed[0]*/ }",
    ".c { background-color:blue /*root/$switch.isClosed*/ }",
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
    ".a { background-color:red /*root/$switch.isOpened*/ }",
    ".b { border-color:cyan /*root/$switch.isOpened/$switch.isOpened*/ }",
    undefined,
    undefined,
    ".e:hover { background-color:yellow /*webOnly/$web/:hover/$switch.isOpened*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".e:hover { background-color:yellow /*webOnly/$web/:hover/$switch.isOpened*/ }",
    ".b { border-color:cyan /*root/$switch.isOpened/$switch.isOpened*/ }",
    ".a { background-color:red /*root/$switch.isOpened*/ }",
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
