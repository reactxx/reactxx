import { TVariants } from "reactxx-typings";
import {
  atomizeSheet,
  ShapeTest as Shape,
  tsTest as ts
} from "reactxx-sheeter";
import { initPlatform } from "reactxx-tests";
import { sheetSwitch_registerVariantHandler } from "../index";

sheetSwitch_registerVariantHandler();

export const createSheet = () =>
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
export const query = (opened: boolean) =>
  ({
    $sheetSwitch: {
      isOpened: opened,
      isClosed: !opened
    }
  } as TVariants.Query<Shape>);
/*
describe("SWITCH define sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet());
`
##########################################
##########################################
#
#  NATIVE
#
##########################################
##########################################
`    
    expect(sheet).toMatchInlineSnapshot();
  });
  it("WEB", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet());
`
##########################################
##########################################
#
#  WEB
#
##########################################
##########################################
`    
    expect(sheet).toMatchInlineSnapshot();
  });
});
*/

describe("SWITCH define sheet", () => {
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet());
    `
##########################################
##########################################
#
#  NATIVE
#
##########################################
##########################################
`;
    expect(sheet).toMatchInlineSnapshot(`
Object {
  "root": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          "backgroundColor: red /*root/$sheetSwitch.isOpened*/",
        ],
        "conditions": Array [
          Object {
            "case": "isOpened",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "backgroundColor: blue /*root/$sheetSwitch.isClosed*/",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "backgroundColor: brown /*root/$native/$sheetSwitch.isOpened*/",
        ],
        "conditions": Array [
          Object {
            "case": "isOpened",
            "type": "$sheetSwitch",
          },
        ],
      },
    ],
    "name": "root",
    "~": "c",
  },
}
`);
  });
  it("WEB", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet());
    `
##########################################
##########################################
#
#  WEB
#
##########################################
##########################################
`;
    expect(sheet).toMatchInlineSnapshot(`
Object {
  "root": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          ".a { background-color:red /*root/$sheetSwitch.isOpened*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isOpened",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".b { background-color:blue /*root/$sheetSwitch.isClosed*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          null,
        ],
      },
      Object {
        "atomicArray": Array [
          ".c:hover { background-color:green /*root/$web/:hover/$sheetSwitch.isClosed*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$sheetSwitch",
          },
        ],
      },
    ],
    "name": "root",
    "~": "c",
  },
  "webOnly": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          null,
        ],
      },
      Object {
        "atomicArray": Array [
          ".d:hover { background-color:yellow /*webOnly/$web/:hover/$sheetSwitch.isOpened*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isOpened",
            "type": "$sheetSwitch",
          },
        ],
      },
    ],
    "name": "webOnly",
    "~": "c",
  },
}
`);
  });
});
