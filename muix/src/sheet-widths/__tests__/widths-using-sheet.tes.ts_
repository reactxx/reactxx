import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape } from "reactxx-tests";
import { createSheet, query } from "./widths-sheet.test_";

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
    "backgroundColor: blue /*root/$switch.mobileWidth*/",
    "backgroundColor: cyan /*root/$switch.tabletWidth*/",
    "backgroundColor: green /*root/$switch.desktopWidth*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$switch.desktopWidth",
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
    "backgroundColor: blue /*root/$switch.mobileWidth*/",
    "backgroundColor: cyan /*root/$switch.tabletWidth*/",
    "backgroundColor: green /*root/$switch.desktopWidth*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "backgroundColor": Object {
      "tracePath": "root/$switch.desktopWidth",
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
    ".a { background-color:blue /*root/$switch.mobileWidth*/ }",
    ".b { background-color:cyan /*root/$switch.tabletWidth*/ }",
    ".c { background-color:green /*root/$switch.desktopWidth*/ }",
    undefined,
    ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.mobileWidth*/ }",
    ".e:hover { background-color:lightcyan /*root/$web/:hover/$switch.tabletWidth*/ }",
    ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.desktopWidth*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.desktopWidth*/ }",
    ".c { background-color:green /*root/$switch.desktopWidth*/ }",
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
    ".a { background-color:blue /*root/$switch.mobileWidth*/ }",
    ".b { background-color:cyan /*root/$switch.tabletWidth*/ }",
    ".c { background-color:green /*root/$switch.desktopWidth*/ }",
    undefined,
    ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.mobileWidth*/ }",
    ".e:hover { background-color:lightcyan /*root/$web/:hover/$switch.tabletWidth*/ }",
    ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.desktopWidth*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.desktopWidth*/ }",
    ".c { background-color:green /*root/$switch.desktopWidth*/ }",
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
