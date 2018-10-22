import { TSheeter } from "reactxx-typings";
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
          isClosed: [
            atomizeRuleset({
              $switch: {
                isOpened: {
                  padding: 11
                }
              },
              padding: 22
            } as TSheeter.RulesetOrAtomized),
            toClassNamesWithQuery(null, [
              {
                padding: 33
              }
            ])
          ]
        }
      }
    ]),
    label: {},
    webOnly: {},
    nativeOnly: {}
  });

export const createSheetWithPseudo = () =>
  (ts.sheet = {
    root: (ts.view = [
      {
        $web: {
          ":active": {
            $switch: {
              isClosed: [
                atomizeRuleset({
                  $switch: {
                    isOpened: {
                      padding: 11
                    }
                  },
                  padding: 22
                } as TSheeter.RulesetOrAtomized),
                toClassNamesWithQuery(null, [
                  {
                    padding: 33
                  }
                ])
              ]
            }
          }
        }
      }
    ]),
    label: {},
    webOnly: {},
    nativeOnly: {}
  });

describe("SWITCH define sheet", () => {
  `
  ##########################################
  ##########################################
  #
  #  WEBS
  #
  ##########################################
  ##########################################
  `;
  it("WEB", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet());
    expect(sheet).toMatchInlineSnapshot(`
Object {
  "root": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          ".a { padding:22px /*.*/ }",
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
          ".b { padding:11px /*./$switch.isOpened*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
          Object {
            "case": "isOpened",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".c { padding:33px /*.*/ }",
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
          ".c { padding:33px /*.*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
        ],
      },
    ],
    "~": "c",
  },
}
`);
  });
  it("WEB with pseudo: WRONG RESULT", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheetWithPseudo());
    expect(sheet).toMatchInlineSnapshot(`
Object {
  "root": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          ".a { padding:22px /*.*/ }",
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
          ".b { padding:11px /*./$switch.isOpened*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
          Object {
            "case": "isOpened",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".c { padding:33px /*.*/ }",
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
          ".c { padding:33px /*.*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
        ],
      },
    ],
    "~": "c",
  },
}
`);
  });
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
          "padding: 22 /*.*/",
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
          "padding: 11 /*./$switch.isOpened*/",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
          Object {
            "case": "isOpened",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "padding: 33 /*.*/",
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
          "padding: 33 /*.*/",
        ],
        "conditions": Array [
          Object {
            "case": "isClosed",
            "type": "$switch",
          },
        ],
      },
    ],
    "~": "c",
  },
}
`);
  });
});
