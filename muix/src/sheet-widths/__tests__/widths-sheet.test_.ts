import { TVariants } from "reactxx-typings";
import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";
import { sheetWidths_registerVariantHandler } from "../index";

sheetWidths_registerVariantHandler();

export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = {
      $widths: {
        mobileWidth: {
          margin: 0,
          $switch: {
            isClosed: {
              backgroundColor: "gray"
            }
          }
        },
        tabletWidth: {
          margin: 10
        },
        desktopWidth: {
          margin: 20
        }
      },
      $web: (ts.web = {
        ":hover": {
          $switch: {
            isClosed: {
              color: "black",
              $widths: {
                mobileWidth: {
                  color: "blue",
                  padding: 0
                },
                tabletWidth: {
                  color: "red",
                  padding: 10
                },
                desktopWidth: {
                  padding: 20
                }
              }
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
    $widths: {
      tabletWidth: opened,
      mobileWidth: !opened
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

describe("WIDTHS define sheet", () => {
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
          "margin: 0 /*root/$widths.mobileWidth*/",
        ],
        "conditions": Array [
          Object {
            "type": "$widths",
            "widthName": "mobileWidth",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "margin: 10 /*root/$widths.tabletWidth*/",
        ],
        "conditions": Array [
          Object {
            "type": "$widths",
            "widthName": "tabletWidth",
          },
        ],
      },
      Object {
        "atomicArray": Array [
          "margin: 20 /*root/$widths.desktopWidth*/",
        ],
        "conditions": Array [
          Object {
            "type": "$widths",
            "widthName": "desktopWidth",
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
          "@media (min-width: NaNpx) and (max-width: NaNpx).a { margin:0 /*root/$widths.mobileWidth*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          "@media (min-width: NaNpx) and (max-width: NaNpx).b { margin:10px /*root/$widths.tabletWidth*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          "@media (min-width: NaNpx) and (max-width: NaNpx).c { margin:20px /*root/$widths.desktopWidth*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          null,
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
