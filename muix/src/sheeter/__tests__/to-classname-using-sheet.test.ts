import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, toClassNames, Shape } from "reactxx-tests";
import { createSheet } from "./to-classname-sheet.test";

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

describe("TO CLASSNAMES, using sheet", () => {
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
    "margin: 4 /*root[0]*/",
    "padding: 4 /*root[0]*/",
    "padding: 10 /*root[1]/$native*/",
    "color: blue /*label*/",
    "margin: 20 /*nativeOnly/$native*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "color": "blue /*label*/",
    "margin": "20 /*nativeOnly/$native*/",
    "padding": "10 /*root[1]/$native*/",
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
    "margin: 4 /*root[0]*/",
    "padding: 4 /*root[0]*/",
    "padding: 10 /*root[1]/$native*/",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Object {
    "margin": "4 /*root[0]*/",
    "padding": "10 /*root[1]/$native*/",
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
    ".a { margin:4px /*root[0]*/ }",
    ".b { padding:4px /*root[0]*/ }",
    ".c { margin:10px /*root[0]/$web*/ }",
    ".d { color:blue /*label*/ }",
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
    ".c { margin:10px /*root[0]/$web*/ }",
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
    ".a { margin:4px /*root[0]*/ }",
    ".b { padding:4px /*root[0]*/ }",
    ".c { margin:10px /*root[0]/$web*/ }",
  ],
  "
******************************************
*  APPLY LASTWINS STRATEGY
******************************************
",
  Array [
    ".c { margin:10px /*root[0]/$web*/ }",
    ".b { padding:4px /*root[0]*/ }",
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
