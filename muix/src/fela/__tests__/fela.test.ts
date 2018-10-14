import { dumpAtomized, getRenderer, resetRenderer } from "reactxx-fela";

test("fela", () => {
  window.isWeb = true;
  resetRenderer();
  const classNames = getRenderer().renderRuleEx(
    {
      // color: "red",
      // margin: 10,
      // ":hover": {
      //   margin: 5,
      //   ":active": {
      //     color: "green"
      //   }
      // },
      ":hover": {
        "@media (min-width: 768px)": {
          ":active": {
            width: 700
          }
        }
      }
      // }
    },
    "root"
  );
  const res = dumpAtomized(classNames);
  expect(res).toMatchInlineSnapshot(`
Object {
  "@media(min-width: 768px).a:hover:active": "width:700px /* root */",
}
`);
});
