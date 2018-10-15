import { TVariants } from "reactxx-typings";
import {
  toClassNamesWithQuery,
  atomizeSheet,
  platform,
  ShapeTest as Shape,
  tsTest as ts
} from "reactxx-sheeter";
import { initPlatform } from "reactxx-tests";
import { sheetSwitch_registerVariantHandler } from "../index";

sheetSwitch_registerVariantHandler();

describe("swich", () => {
  const createSheet = () =>
    (ts.sheet = {
      root: (ts.view = {
        $sheetSwitch: {
          isOpened: {
            backgroundColor: "red"
          },
          isClosed: {
            backgroundColor: "blue"
          }
        },
        $web: (ts.web = {
          ":hover": {
            $sheetSwitch: {
              isClosed: {
                backgroundColor: "green"
              }
            }
          }
        }),
        $native: (ts.nativeView = {
          $sheetSwitch: {
            isOpened: {
              backgroundColor: "brown"
            }
          }
        })
      }),
      label: {},
      webOnly: {
        $web: {
          ":hover": {
            $sheetSwitch: {
              isOpened: {
                backgroundColor: "yellow"
              }
            }
          }
        }
      },
      nativeOnly: {}
    });
  const query = (opened: boolean) => ({
    sheetQuery: {
      $sheetSwitch: {
        isClosed: opened,
        isOpened: !opened
      }
    } as TVariants.Query<Shape>
  });
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet());
    let atomizedSheet = toClassNamesWithQuery(query(true), [
      sheet.root,
      sheet.nativeOnly
    ]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  "backgroundColor: red /*root/$sheetSwitch.isOpened*/",
  "backgroundColor: brown /*root/$native/$sheetSwitch.isOpened*/",
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
Object {
  "backgroundColor": Object {
    "tracePath": "root/$native/$sheetSwitch.isOpened",
    "value": "brown",
  },
}
`);
    atomizedSheet = toClassNamesWithQuery(query(false), [
      sheet.root,
      sheet.nativeOnly
    ]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  "backgroundColor: blue /*root/$sheetSwitch.isClosed*/",
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
Object {
  "backgroundColor": Object {
    "tracePath": "root/$sheetSwitch.isClosed",
    "value": "blue",
  },
}
`);
  });
  it("WEB DEVELOPMENT", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet());
    let atomizedSheet = toClassNamesWithQuery(query(true), [
      sheet.root,
      sheet.webOnly
    ]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  ".a { background-color:red /*root/$sheetSwitch.isOpened*/ }",
  undefined,
  undefined,
  ".d:hover { background-color:yellow /*webOnly/$web/:hover/$sheetSwitch.isOpened*/ }",
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
Array [
  ".d:hover { background-color:yellow /*webOnly/$web/:hover/$sheetSwitch.isOpened*/ }",
  ".a { background-color:red /*root/$sheetSwitch.isOpened*/ }",
]
`);
    atomizedSheet = toClassNamesWithQuery(query(false), [
      sheet.root,
      sheet.webOnly
    ]);
    expect(platform.dumpAtomized(atomizedSheet)).toMatchInlineSnapshot(`
Array [
  ".b { background-color:blue /*root/$sheetSwitch.isClosed*/ }",
  undefined,
  ".c:hover { background-color:green /*root/$web/:hover/$sheetSwitch.isClosed*/ }",
  undefined,
]
`);
    expect(platform.dumpAtomized(platform.applyLastwinsStrategy(atomizedSheet)))
      .toMatchInlineSnapshot(`
Array [
  ".c:hover { background-color:green /*root/$web/:hover/$sheetSwitch.isClosed*/ }",
  ".b { background-color:blue /*root/$sheetSwitch.isClosed*/ }",
]
`);
  });
});
