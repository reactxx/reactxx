import { TVariants } from "reactxx-typings";
import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";
import { sheetSwitch_registerVariantHandler } from "reactxx-sheet-switch";

sheetSwitch_registerVariantHandler();

export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = {
      $sheetSwitch: {
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
          $sheetSwitch: {
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
          "backgroundColor: blue /*root/$sheetSwitch.mobileWidth*/",
        ],
        "conditions": Array [
          Object {
            "case": "mobileWidth",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "backgroundColor: cyan /*root/$sheetSwitch.tabletWidth*/",
        ],
        "conditions": Array [
          Object {
            "case": "tabletWidth",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "backgroundColor: green /*root/$sheetSwitch.desktopWidth*/",
        ],
        "conditions": Array [
          Object {
            "case": "desktopWidth",
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
          ".a { background-color:blue /*root/$sheetSwitch.mobileWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "mobileWidth",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".b { background-color:cyan /*root/$sheetSwitch.tabletWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "tabletWidth",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".c { background-color:green /*root/$sheetSwitch.desktopWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "desktopWidth",
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
          ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.mobileWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "mobileWidth",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".e:hover { background-color:lightcyan /*root/$web/:hover/$sheetSwitch.tabletWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "tabletWidth",
            "type": "$sheetSwitch",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          ".d:hover { background-color:lightblue /*root/$web/:hover/$sheetSwitch.desktopWidth*/ }",
        ],
        "conditions": Array [
          Object {
            "case": "desktopWidth",
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
});
