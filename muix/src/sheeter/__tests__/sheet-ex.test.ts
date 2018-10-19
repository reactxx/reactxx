import {
  atomizeSheet,
  atomizeRuleset,
  toClassNamesWithQuery
} from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";

export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = [
      {
        backgroundColor: "blue"
      },
      {
        $web: [
          {
            ":hover": {
              color: "red",
            }
          },
          atomizeRuleset([
            {
              $web: {
                ":active": {
                  marginTop: 11,
                  marginBottom: 11
                }
              }
            }
          ]),
          toClassNamesWithQuery(null, [
            {
              paddingTop: 11,
              paddingBottom: 11
            }
          ])
        ]
      },
      atomizeRuleset([
        {
          marginTop: 21,
          marginBottom: 21
        }
      ]),
      toClassNamesWithQuery(null, [
        {
          paddingTop: 21,
          paddingBottom: 21
        }
      ])
    ]),
    label: toClassNamesWithQuery(null, {
      paddingTop: 31,
      paddingBottom: 31
    }),
    webOnly: {
      $web: atomizeRuleset({
        marginTop: 41,
        marginBottom: 41
      })
    },
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
  "label": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          "paddingTop: 31 /*.*/",
          "paddingBottom: 31 /*.*/",
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
          "backgroundColor: blue /*root[0]*/",
        ],
      },
      Object {
        "atomicArray": Array [
          "marginTop: 21 /*.[0]*/",
          "marginBottom: 21 /*.[0]*/",
        ],
      },
      Object {
        "atomicArray": Array [
          "paddingTop: 21 /*.*/",
          "paddingBottom: 21 /*.*/",
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
  "label": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          ".i { padding-top:31px /*.*/ }",
          ".j { padding-bottom:31px /*.*/ }",
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
          ".m { background-color:blue /*root[0]*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          ".n:hover { color:red /*root[1]/$web[0]*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          ".a:active { margin-top:11px /*.[0]/$web*/ }",
          ".b:active { margin-bottom:11px /*.[0]/$web*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          ".c { padding-top:11px /*.*/ }",
          ".d { padding-bottom:11px /*.*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          ".e { margin-top:21px /*.[0]*/ }",
          ".f { margin-bottom:21px /*.[0]*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          ".g { padding-top:21px /*.*/ }",
          ".h { padding-bottom:21px /*.*/ }",
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
          ".k { margin-top:41px /*.*/ }",
          ".l { margin-bottom:41px /*.*/ }",
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
