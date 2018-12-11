import { wrapPseudoPrefixes } from "../wrap-pseudo-prefixes";

test("wrapPseudoPrefixes", () => {
  const res = wrapPseudoPrefixes({ color: "red" }, [
    ":hover",
    "@media (min-width: 768px)"
  ]);
  expect(res).toMatchSnapshot();
});
