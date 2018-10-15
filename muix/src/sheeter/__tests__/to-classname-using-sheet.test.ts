import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape } from "reactxx-tests";
import { createSheet } from "./to-classname-sheet.test";

describe("core sheet simple", () => {
  /*
  it("NATIVE", () => {
    initPlatform(false);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames('NATIVE: root, label, nativeOnly', null, [
      sheet.root,
      sheet.label,
      sheet.nativeOnly
    ], res => res.toMatchInlineSnapshot())

    toClassNames('NATIVE: nativeOnly, root', null, [
      sheet.nativeOnly, sheet.root
    ], res => res.toMatchInlineSnapshot())
  });
  it("WEB", () => {
    initPlatform(true);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames('WEB: root, label, webOnly', null, [
      sheet.root,
      sheet.label,
      sheet.webOnly
    ], res => res.toMatchInlineSnapshot())

    toClassNames('WEB: webOnly, root', null, [
      sheet.webOnly, sheet.root
    ], res => res.toMatchInlineSnapshot())
  });
 */

  it("NATIVE", () => {
    initPlatform(false);

    const sheet = atomizeSheet<Shape>(createSheet());

    toClassNames(
      "NATIVE: root, label, nativeOnly",
      null,
      [sheet.root, sheet.label, sheet.nativeOnly],
      res =>
        res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  NATIVE: root, label, nativeOnly
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
    "margin: 4 /*root*/",
    "padding: 4 /*root*/",
    "padding: 10 /*root/$native*/",
    "color: blue /*label[0]*/",
    "margin: 20 /*nativeOnly/$native*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "color": Object {
      "tracePath": "label[0]",
      "value": "blue",
    },
    "margin": Object {
      "tracePath": "nativeOnly/$native",
      "value": 20,
    },
    "padding": Object {
      "tracePath": "root/$native",
      "value": 10,
    },
  },
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  Object {
    "color": "blue",
    "margin": 20,
    "padding": 10,
  },
]
`)
    );

    toClassNames(
      "NATIVE: nativeOnly, root",
      null,
      [sheet.nativeOnly, sheet.root],
      res =>
        res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  NATIVE: nativeOnly, root
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
    "margin: 20 /*nativeOnly/$native*/",
    "margin: 4 /*root*/",
    "padding: 4 /*root*/",
    "padding: 10 /*root/$native*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "margin": Object {
      "tracePath": "root",
      "value": 4,
    },
    "padding": Object {
      "tracePath": "root/$native",
      "value": 10,
    },
  },
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  Object {
    "margin": 4,
    "padding": 10,
  },
]
`)
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
        res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  WEB: root, label, webOnly
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
    ".a { margin:4px /*root*/ }",
    ".b { padding:4px /*root*/ }",
    ".c { margin:10px /*root/$web*/ }",
    ".d { color:blue /*label[0]*/ }",
    ".e { color:red /*webOnly/$web*/ }",
    ".f { padding:20px /*webOnly/$web*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".f { padding:20px /*webOnly/$web*/ }",
    ".e { color:red /*webOnly/$web*/ }",
    ".c { margin:10px /*root/$web*/ }",
  ],
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  "f e c",
]
`)
    );

    toClassNames("WEB: webOnly, root", null, [sheet.webOnly, sheet.root], res =>
      res.toMatchInlineSnapshot(`
Array [
  "
##########################################
##########################################
#
#  WEB: webOnly, root
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
    ".e { color:red /*webOnly/$web*/ }",
    ".f { padding:20px /*webOnly/$web*/ }",
    ".a { margin:4px /*root*/ }",
    ".b { padding:4px /*root*/ }",
    ".c { margin:10px /*root/$web*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".c { margin:10px /*root/$web*/ }",
    ".b { padding:4px /*root*/ }",
    ".e { color:red /*webOnly/$web*/ }",
  ],
  "
******************************************
*  FINALIZE FOR for web's className or native's style
******************************************
",
  "c b e",
]
`)
    );
  });
});
