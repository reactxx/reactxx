import { wrapPseudoPrefixes } from "../wrap-pseudo-prefixes";

test("wrapPseudoPrefixes", () => {
  const res = wrapPseudoPrefixes({ color: "red" }, [":hover", ":active"]);
  expect(res).toMatchInlineSnapshot(`
Object {
  ":hover": Object {
    ":active": Object {
      "color": "red",
    },
  },
}
`);
});
