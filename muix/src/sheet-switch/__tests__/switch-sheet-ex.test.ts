import { TVariants } from "reactxx-typings";
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
    root: (ts.view = {
      $web: (ts.web = {
        ":hover": {
          $switch: {
            isClosed: [
              {
                ":active": {
                  backgroundColor: "blue"
                }
              },
              atomizeRuleset({
                margin: 11
              }),
              toClassNamesWithQuery(null, {
                padding: 11
              })
            ]
          }
        }
      })
    }),
    label: (ts.text = {
      $switch: {
        isClosed: [
          {
            $web: [
              {
                ":active": {
                  backgroundColor: "blue"
                }
              }
            ]
          },
          atomizeRuleset([
            {
              $native: {
                margin: 11
              },
              $web: {
                margin: 21
              }
            }
          ]),
          toClassNamesWithQuery(null, [
            {
              padding: 31
            }
          ])
        ]
      }
    }),
    webOnly: {},
    nativeOnly: {}
  });
export const query = (opened: boolean) =>
  ({
    $switch: {
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
  "label": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          "name: unknown /*label/$switch.isClosed[1]*/",
          "list: [object Object] /*label/$switch.isClosed[1]*/",
          "~: c /*label/$switch.isClosed[1]*/",
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
          "0: [object Object] /*label/$switch.isClosed[2]*/",
          "~: v /*label/$switch.isClosed[2]*/",
          "state: null /*label/$switch.isClosed[2]*/",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
        ],
      },
    ],
    "name": "label",
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
  "label": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          ".j { name:unknown /*label/$switch.isClosed[1]*/ }",
          ".k { list:[object Object] /*label/$switch.isClosed[1]*/ }",
          ".l { ~:c /*label/$switch.isClosed[1]*/ }",
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
          ".m { ~:v /*label/$switch.isClosed[2]*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
        ],
      },
    ],
    "name": "label",
    "~": "c",
  },
  "root": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          null,
        ],
      },
      Object {
        "atomicArray": Array [
          ".e:hover:active { background-color:blue /*root/$web/:hover/$switch.isClosed[0]*/ }",
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
          ".f:hover { name:unknown /*root/$web/:hover/$switch.isClosed[1]*/ }",
          ".g:hover { list:[object Object] /*root/$web/:hover/$switch.isClosed[1]*/ }",
          ".h:hover { ~:c /*root/$web/:hover/$switch.isClosed[1]*/ }",
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
          ".i { :hover:[object Object] /*root/$web/:hover/$switch.isClosed[2]*/ }",
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
