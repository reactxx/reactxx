import {
  atomizeSheet,
  atomizeRuleset,
  toClassNamesWithQuery
} from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";

import { sheetSwitch_registerVariantHandler } from "../index";

sheetSwitch_registerVariantHandler();

export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = [
      {
        $switch: {
          isClosed: {
            cursor: "pointer",
            $web: [
              {
                ":hover": {
                  color: "red"
                }
              }
            ]
          }
        }
      }
    ]),
    label: {},
    webOnly: {},
    nativeOnly: {}
  });

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
          "cursor: pointer /*root[0]/$switch.isClosed*/",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
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
          ".a { cursor:pointer /*root[0]/$switch.isClosed*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".b:hover { color:red /*root[0]/$switch.isClosed/$web[0]*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
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
});
