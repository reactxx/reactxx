import { TVariants } from "reactxx-typings";
import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";
import { sheetSwitch_registerVariantHandler } from "reactxx-sheet-switch";

sheetSwitch_registerVariantHandler();

export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = {
      $widths: {
        mobileWidth: {
          backgroundColor: "blue"
        },
        tabletWidth: {
          backgroundColor: "cyan"
        },
        desktopWidth: {
          backgroundColor: "green"
        }
      },
      $web: (ts.web = {
        ":hover": {
          $widths: {
            mobileWidth: {
              backgroundColor: "lightblue"
            },
            tabletWidth: {
              backgroundColor: "lightcyan"
            },
            desktopWidth: {
              backgroundColor: "lightblue"
            }
          }
        }
      })
    }),
    label: {},
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
  "root": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          "backgroundColor: blue /*root/$switch.mobileWidth*/",
        ],
        "conditions": Array [
          Object {
            "case": "mobileWidth",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "backgroundColor: cyan /*root/$switch.tabletWidth*/",
        ],
        "conditions": Array [
          Object {
            "case": "tabletWidth",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "backgroundColor: green /*root/$switch.desktopWidth*/",
        ],
        "conditions": Array [
          Object {
            "case": "desktopWidth",
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
          ".a { background-color:blue /*root/$switch.mobileWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "mobileWidth",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".b { background-color:cyan /*root/$switch.tabletWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "tabletWidth",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".c { background-color:green /*root/$switch.desktopWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "desktopWidth",
            "type": "$switch",
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
          ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.mobileWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "mobileWidth",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".e:hover { background-color:lightcyan /*root/$web/:hover/$switch.tabletWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "tabletWidth",
            "type": "$switch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".d:hover { background-color:lightblue /*root/$web/:hover/$switch.desktopWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "desktopWidth",
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
