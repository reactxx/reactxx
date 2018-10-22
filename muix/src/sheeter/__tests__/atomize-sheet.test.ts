import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, ts, Shape } from "reactxx-tests";

describe("ATOMIZE SHEET", () => {
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
    "~": "c",
  },
}
`);
  });
});
