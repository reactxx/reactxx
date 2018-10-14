import { ts, Shape } from "./shape";
import { toClassNamesWithQuery, atomizeSheet, platform } from "reactxx-sheeter";
import { initPlatform } from "reactxx-tests";

describe("core sheet simple", () => {
  const createSheet = () =>
    (ts.sheet = {
      root: (ts.view = {
        margin: 4,
        padding: 4,
        $web: (ts.web = {
          margin: 10
        }),
        $native: (ts.nativeView = {
          padding: 10
        })
      }),
      label: (ts.text = [
        {
          color: "blue"
        }
      ]),
      webOnly: {
        $web: (ts.web = {
          color: "red",
          padding: 20
        })
      },
      nativeOnly: {
        $native: (ts.nativeView = {
          margin: 20
        })
      }
    });
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet());
    let atomizedSheet = toClassNamesWithQuery(null, [
      sheet.root,
      sheet.label,
      sheet.nativeOnly
    ]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  "margin: 4 /*root*/",
  "padding: 4 /*root*/",
  "padding: 10 /*root/$native*/",
  "color: blue /*label[0]*/",
  "margin: 20 /*nativeOnly/$native*/",
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
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
}
`);
    atomizedSheet = toClassNamesWithQuery(null, [sheet.nativeOnly, sheet.root]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  "margin: 20 /*nativeOnly/$native*/",
  "margin: 4 /*root*/",
  "padding: 4 /*root*/",
  "padding: 10 /*root/$native*/",
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
Object {
  "margin": Object {
    "tracePath": "root",
    "value": 4,
  },
  "padding": Object {
    "tracePath": "root/$native",
    "value": 10,
  },
}
`);
  });
  it("WEB DEVELOPMENT", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet());
    let atomizedSheet = toClassNamesWithQuery(null, [
      sheet.root,
      sheet.label,
      sheet.webOnly
    ]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  ".a { margin:4px /*root*/ }",
  ".b { padding:4px /*root*/ }",
  ".c { margin:10px /*root/$web*/ }",
  ".d { color:blue /*label[0]*/ }",
  ".e { color:red /*webOnly/$web*/ }",
  ".f { padding:20px /*webOnly/$web*/ }",
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
Array [
  ".f { padding:20px /*webOnly/$web*/ }",
  ".e { color:red /*webOnly/$web*/ }",
  ".c { margin:10px /*root/$web*/ }",
]
`);
    atomizedSheet = toClassNamesWithQuery(null, [sheet.webOnly, sheet.root]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  ".e { color:red /*webOnly/$web*/ }",
  ".f { padding:20px /*webOnly/$web*/ }",
  ".a { margin:4px /*root*/ }",
  ".b { padding:4px /*root*/ }",
  ".c { margin:10px /*root/$web*/ }",
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
Array [
  ".c { margin:10px /*root/$web*/ }",
  ".b { padding:4px /*root*/ }",
  ".e { color:red /*webOnly/$web*/ }",
]
`);
  });
});
