import { ts, Shape } from "./shape";
import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform } from "reactxx-tests";

describe("core sheet simple", () => {
  const createSheet = () =>
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
          color: "red"
        })
      },
      nativeOnly: {
        $native: (ts.nativeView = {
          margin: 20
        })
      }
    });
  it("NATIVE, DEVELOPMENt", () => {
    initPlatform(false);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchInlineSnapshot(`
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
  it("NATIVE, PRODUCTION", () => {
    initPlatform(false, false);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchInlineSnapshot(`
Object {
  "label": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          Object {
            "propId": "color",
            "value": "blue",
          },
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
          Object {
            "propId": "margin",
            "value": 20,
          },
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
          Object {
            "propId": "margin",
            "value": 4,
          },
          Object {
            "propId": "padding",
            "value": 4,
          },
        ],
      },
      Object {
        "atomicArray": Array [
          Object {
            "propId": "padding",
            "value": 10,
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
  it("WEB DEVELOPMENT", () => {
    initPlatform(true);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchInlineSnapshot(`
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
        ],
      },
    ],
    "name": "webOnly",
    "~": "c",
  },
}
`);
  });
  it("WEB PRODUCTION", () => {
    initPlatform(true, false);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchInlineSnapshot(`
Object {
  "label": Object {
    "list": Array [
      Object {
        "atomicArray": Array [
          "d",
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
          "a",
          "b",
        ],
      },
      Object {
        "atomicArray": Array [
          "c",
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
          "e",
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
