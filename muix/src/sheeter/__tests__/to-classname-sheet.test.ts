import { ts, Shape } from "./shape";
import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform } from "reactxx-tests";

export const createSheet = () =>
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

describe("TO CLASSNAMES, sheet", () => {
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
          "color: blue /*label[0]*/",
        ],
      },
    ],
    "name": "label",
    "~": "c",
  },
  "nativeOnly": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          "margin: 20 /*nativeOnly/$native*/",
        ],
      },
    ],
    "name": "nativeOnly",
    "~": "c",
  },
  "root": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          "margin: 4 /*root*/",
          "padding: 4 /*root*/",
        ],
      },
      Object {
        "atomicArray": Array [
          "padding: 10 /*root/$native*/",
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
          ".d { color:blue /*label[0]*/ }",
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
          ".a { margin:4px /*root*/ }",
          ".b { padding:4px /*root*/ }",
        ],
      },
      Object {
        "atomicArray": Array [
          ".c { margin:10px /*root/$web*/ }",
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
          ".e { color:red /*webOnly/$web*/ }",
          ".f { padding:20px /*webOnly/$web*/ }",
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
