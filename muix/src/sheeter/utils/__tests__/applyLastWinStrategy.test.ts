import { WEB, NATIVE } from "./applyLastWinStrategy.testlib";
import { initPlatform } from "reactxx-tests";

/*
    expect(ruleset1).toMatchInlineSnapshot()
    expect(ruleset2).toMatchInlineSnapshot()
    expect(ruleset1Wins).toMatchInlineSnapshot()
    expect(ruleset2Wins).toMatchInlineSnapshot()
    expect(final1).toMatchInlineSnapshot()
    expect(final2).toMatchInlineSnapshot()
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
    initPlatform(true);

    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins,
      final1,
      final2
    } = WEB.defineRulesets(DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Array [
  ".a { color:red /*ruleset1*/ }",
  ".b { right:20px /*ruleset1*/ }",
]
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Array [
  ".c { color:black /*ruleset2*/ }",
  ".d { left:10px /*ruleset2*/ }",
]
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Array [
  ".b { right:20px /*ruleset1*/ }",
  ".a { color:red /*ruleset1*/ }",
  ".d { left:10px /*ruleset2*/ }",
  "SOURCE=c d a b",
  "RESULT=b a d",
]
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Array [
  ".d { left:10px /*ruleset2*/ }",
  ".c { color:black /*ruleset2*/ }",
  ".b { right:20px /*ruleset1*/ }",
  "SOURCE=a b c d",
  "RESULT=d c b",
]
`);
    expect(final1).toMatchInlineSnapshot(`"b a d"`);
    expect(final2).toMatchInlineSnapshot(`"d c b"`);
  });
  //*********************************************************
  //  WEB PRODUCTION
  //*********************************************************

  it("WEB, production environment", () => {
    initPlatform(true, false);
    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins,
      final1,
      final2
    } = WEB.defineRulesets(DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Array [
  "DUMP is available in window.__DEV__ only",
]
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Array [
  "DUMP is available in window.__DEV__ only",
]
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Array [
  "DUMP is available in window.__DEV__ only",
  "SOURCE=c d a b",
  "RESULT=b a d",
]
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Array [
  "DUMP is available in window.__DEV__ only",
  "SOURCE=a b c d",
  "RESULT=d c b",
]
`);
    expect(final1).toMatchInlineSnapshot(`"b a d"`);
    expect(final2).toMatchInlineSnapshot(`"d c b"`);
  });
  //*********************************************************
  //  NATIVE DEVELOPMENT
  //*********************************************************

  it("NATIVE, development environment", () => {
    initPlatform(false);

    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins,
      final1,
      final2
    } = NATIVE.defineRulesets(DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Array [
  "color: red /*ruleset1*/",
  "right: 20px /*ruleset1*/",
]
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Array [
  "color: black /*ruleset2*/",
  "left: 10px /*ruleset2*/",
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
    expect(final1).toMatchInlineSnapshot(`
Object {
  "color": "red",
  "left": "10px",
  "right": "20px",
}
`);
    expect(final2).toMatchInlineSnapshot(`
Object {
  "color": "black",
  "left": "10px",
  "right": "20px",
}
`);
  });
  //*********************************************************
  //  NATIVE PRODUCTION
  //*********************************************************

  it("NATIVE, production environment", () => {
    initPlatform(false, false);
    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins,
      final1,
      final2
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
    expect(final1).toMatchInlineSnapshot(`
Object {
  "color": "red",
  "left": "10px",
  "right": "20px",
}
`);
    expect(final2).toMatchInlineSnapshot(`
Object {
  "color": "black",
  "left": "10px",
  "right": "20px",
}
`);
  });
});

describe("applyLastwinsStrategy pseudo WEB", () => {
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
    initPlatform(true);

    const {
      ruleset1,
      ruleset2,
      ruleset1Wins,
      ruleset2Wins,
      final1,
      final2
    } = WEB.defineRulesets(WEB_DATA);

    expect(ruleset1).toMatchInlineSnapshot(`
Array [
  ".a:hover { color:green /*ruleset1*/ }",
  ".b:hover { margin:5px /*ruleset1*/ }",
  "@media (min-width: 768px).c:hover { color:red /*ruleset1*/ }",
  "@media (min-width: 768px).d:hover:active { color:blue /*ruleset1*/ }",
]
`);
    expect(ruleset2).toMatchInlineSnapshot(`
Array [
  ".e:hover { color:red /*ruleset2*/ }",
  ".f:hover { padding:10px /*ruleset2*/ }",
  "@media (min-width: 768px).g:hover { color:brown /*ruleset2*/ }",
  "@media (min-width: 768px).h:hover:active { color:maroon /*ruleset2*/ }",
]
`);
    expect(ruleset1Wins).toMatchInlineSnapshot(`
Array [
  "@media (min-width: 768px).d:hover:active { color:blue /*ruleset1*/ }",
  "@media (min-width: 768px).c:hover { color:red /*ruleset1*/ }",
  ".b:hover { margin:5px /*ruleset1*/ }",
  ".a:hover { color:green /*ruleset1*/ }",
  ".f:hover { padding:10px /*ruleset2*/ }",
  "SOURCE=e f g h a b c d",
  "RESULT=d c b a f",
]
`);
    expect(ruleset2Wins).toMatchInlineSnapshot(`
Array [
  "@media (min-width: 768px).h:hover:active { color:maroon /*ruleset2*/ }",
  "@media (min-width: 768px).g:hover { color:brown /*ruleset2*/ }",
  ".f:hover { padding:10px /*ruleset2*/ }",
  ".e:hover { color:red /*ruleset2*/ }",
  ".b:hover { margin:5px /*ruleset1*/ }",
  "SOURCE=a b c d e f g h",
  "RESULT=h g f e b",
]
`);
    expect(final1).toMatchInlineSnapshot(`"d c b a f"`);
    expect(final2).toMatchInlineSnapshot(`"h g f e b"`);
  });
});
