import { ts, Shape } from "./shape";
import { dumpAtomized } from "reactxx-fela";
import { atomizeSheet } from "reactxx-sheeter";
import { TSBugHelper } from "..";
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
  it("NATIVE", () => {
    initPlatform(false);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchInlineSnapshot(`
Object {
  "label": Object {
    "\`\`": "c",
    "list": Array [
      Object {
        "atomicArray": Array [
          "color: blue",
        ],
      },
    ],
    "name": "label",
  },
  "nativeOnly": Object {
    "\`\`": "c",
    "list": Array [
      Object {
        "atomicArray": Array [
          "margin: 20",
        ],
      },
    ],
    "name": "nativeOnly",
  },
  "root": Object {
    "\`\`": "c",
    "list": Array [
      Object {
        "atomicArray": Array [
          "margin: 4",
          "padding: 4",
        ],
      },
      Object {
        "atomicArray": Array [
          "padding: 10",
        ],
      },
    ],
    "name": "root",
  },
}
`);
  });
  it("WEB", () => {
    initPlatform(true);
    const atomizedSheet = atomizeSheet<Shape>(createSheet(), null);
    expect(atomizedSheet).toMatchInlineSnapshot(`
Object {
  "label": Object {
    "\`\`": "c",
    "list": Array [
      Object {
        "atomicArray": Array [
          "d",
        ],
      },
    ],
    "name": "label",
  },
  "root": Object {
    "\`\`": "c",
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
  },
  "webOnly": Object {
    "\`\`": "c",
    "list": Array [
      Object {
        "atomicArray": Array [
          "e",
        ],
      },
    ],
    "name": "webOnly",
  },
}
`);
  });
});
