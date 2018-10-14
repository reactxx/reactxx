import { WEB, NATIVE } from "./applyLastWinStrategy.testlib";

/*
    expect(ruleset1).toMatchInlineSnapshot()
    expect(ruleset2).toMatchInlineSnapshot()
    expect(ruleset1Wins).toMatchInlineSnapshot()
    expect(ruleset2Wins).toMatchInlineSnapshot()
*/

describe("applyLastwinsStrategy simple", () => {
  const DATA = {
    ruleset1: {
      color: "red", // to override
      right: 20 // to use
    },
    ruleset2: {
      color: "black", // to override
      left: 10
    }
  };

  //*********************************************************
  //  WEB DEVELOPMENT
  //*********************************************************

  it("WEB, development environment", () => {
    window.__DEV__ = true;
    window.isWeb = true;

    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins
    } = WEB.defineRulesets(DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Object {
  ".a": "color:red /* ruleset1 */",
  ".b": "right:20px /* ruleset1 */",
}
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Object {
  ".c": "color:black /* ruleset2 */",
  ".d": "left:10px /* ruleset2 */",
}
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Object {
  " result": "b a d",
  " source": "c d a b",
  ".a": "color:red /* ruleset1 */",
  ".b": "right:20px /* ruleset1 */",
  ".d": "left:10px /* ruleset2 */",
}
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Object {
  " result": "d c b",
  " source": "a b c d",
  ".b": "right:20px /* ruleset1 */",
  ".c": "color:black /* ruleset2 */",
  ".d": "left:10px /* ruleset2 */",
}
`);
  });
  //*********************************************************
  //  WEB PRODUCTION
  //*********************************************************

  it("WEB, production environment", () => {
    window.__DEV__ = false;
    window.isWeb = true;
    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins
    } = WEB.defineRulesets(DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Object {
  "info": "DUMP is available in window.__DEV__ only",
}
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Object {
  "info": "DUMP is available in window.__DEV__ only",
}
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Object {
  " result": "b a d",
  " source": "c d a b",
  "info": "DUMP is available in window.__DEV__ only",
}
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Object {
  " result": "d c b",
  " source": "a b c d",
  "info": "DUMP is available in window.__DEV__ only",
}
`);
  });
  //*********************************************************
  //  NATIVE DEVELOPMENT
  //*********************************************************

  it("NATIVE, development environment", () => {
    window.__DEV__ = true;
    window.isWeb = false;

    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins
    } = NATIVE.defineRulesets(DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Array [
  Object {
    "propId": "color",
    "value": Object {
      "tracePath": "ruleset1",
      "value": "red",
    },
  },
  Object {
    "propId": "right",
    "value": Object {
      "tracePath": "ruleset1",
      "value": "20px",
    },
  },
]
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Array [
  Object {
    "propId": "color",
    "value": Object {
      "tracePath": "ruleset2",
      "value": "black",
    },
  },
  Object {
    "propId": "left",
    "value": Object {
      "tracePath": "ruleset2",
      "value": "10px",
    },
  },
]
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Object {
  "color": Object {
    "tracePath": "ruleset1",
    "value": "red",
  },
  "left": Object {
    "tracePath": "ruleset2",
    "value": "10px",
  },
  "right": Object {
    "tracePath": "ruleset1",
    "value": "20px",
  },
}
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Object {
  "color": Object {
    "tracePath": "ruleset2",
    "value": "black",
  },
  "left": Object {
    "tracePath": "ruleset2",
    "value": "10px",
  },
  "right": Object {
    "tracePath": "ruleset1",
    "value": "20px",
  },
}
`);
  });
  //*********************************************************
  //  NATIVE PRODUCTION
  //*********************************************************

  it("NATIVE, production environment", () => {
    window.__DEV__ = false;
    window.isWeb = false;
    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins
    } = NATIVE.defineRulesets(DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Array [
  Object {
    "propId": "color",
    "value": "red",
  },
  Object {
    "propId": "right",
    "value": "20px",
  },
]
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Array [
  Object {
    "propId": "color",
    "value": "black",
  },
  Object {
    "propId": "left",
    "value": "10px",
  },
]
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Object {
  "color": "red",
  "left": "10px",
  "right": "20px",
}
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Object {
  "color": "black",
  "left": "10px",
  "right": "20px",
}
`);
  });
});

describe("applyLastwinsStrategy pseudo WEB", () => {
  window.isWeb = true;

  const WEB_DATA = {
    ruleset1: {
      ":hover": {
        color: "green",
        margin: 5,
        "@media (min-width: 768px)": {
          color: "red",
          ":active": {
            color: "blue"
          }
        }
      }
    },
    ruleset2: {
      ":hover": {
        color: "red",
        padding: 10,
        "@media (min-width: 768px)": {
          color: "brown",
          ":active": {
            color: "maroon"
          }
        }
      }
    }
  };

  //*********************************************************
  //  WEB DEVELOPMENT
  //*********************************************************

  it("development environment", () => {
    window.__DEV__ = true;

    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins
    } = WEB.defineRulesets(WEB_DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Object {
  ".a:hover": "color:green /* ruleset1 */",
  ".b:hover": "margin:5px /* ruleset1 */",
  "@media (min-width: 768px).c:hover": "color:red /* ruleset1 */",
  "@media (min-width: 768px).d:hover:active": "color:blue /* ruleset1 */",
}
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Object {
  ".e:hover": "color:red /* ruleset2 */",
  ".f:hover": "padding:10px /* ruleset2 */",
  "@media (min-width: 768px).g:hover": "color:brown /* ruleset2 */",
  "@media (min-width: 768px).h:hover:active": "color:maroon /* ruleset2 */",
}
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Object {
  " result": "d c b a f",
  " source": "e f g h a b c d",
  ".a:hover": "color:green /* ruleset1 */",
  ".b:hover": "margin:5px /* ruleset1 */",
  ".f:hover": "padding:10px /* ruleset2 */",
  "@media (min-width: 768px).c:hover": "color:red /* ruleset1 */",
  "@media (min-width: 768px).d:hover:active": "color:blue /* ruleset1 */",
}
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Object {
  " result": "h g f e b",
  " source": "a b c d e f g h",
  ".b:hover": "margin:5px /* ruleset1 */",
  ".e:hover": "color:red /* ruleset2 */",
  ".f:hover": "padding:10px /* ruleset2 */",
  "@media (min-width: 768px).g:hover": "color:brown /* ruleset2 */",
  "@media (min-width: 768px).h:hover:active": "color:maroon /* ruleset2 */",
}
`);
  });
});
