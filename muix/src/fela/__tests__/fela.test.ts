import { rendererCreate, dumpAtomized } from "reactxx-fela";

test("fela", () => {
  window.isWeb = true
  const renderer = rendererCreate();
  const classNames = renderer.renderRuleEx(
    {
      color: "red",
      margin: 10,
      ":hover": {
        margin: 5,
        ":active": {
          color: "green"
        }
      }
    },
    "root"
  );
  const res = dumpAtomized(renderer, classNames);
  expect(res).toMatchInlineSnapshot(`
Object {
  ":hover :active d": "{color: green} /*root*/",
  ":hover c": "{margin: 5px} /*root*/",
  "a": "{color: red} /*root*/",
  "b": "{margin: 10px} /*root*/",
}
`);
});
