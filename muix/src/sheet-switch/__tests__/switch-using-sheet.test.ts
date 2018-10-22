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
  Array [],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {},
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  Object {},
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
    "backgroundColor": "brown /*root/$native/$switch.isOpened*/",
    "borderColor": "cyan /*root/$switch.isOpened/$switch.isOpened*/",
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
    ".c:hover { background-color:green /*root/$web/:hover/$switch.isClosed[0]*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".c:hover { background-color:green /*root/$web/:hover/$switch.isClosed[0]*/ }",
  ],
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  "c",
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
    ".d:hover { background-color:yellow /*webOnly/$web/:hover/$switch.isOpened*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".d:hover { background-color:yellow /*webOnly/$web/:hover/$switch.isOpened*/ }",
    ".b { border-color:cyan /*root/$switch.isOpened/$switch.isOpened*/ }",
    ".a { background-color:red /*root/$switch.isOpened*/ }",
  ],
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  "d b a",
]
`)
    );
  });
});
