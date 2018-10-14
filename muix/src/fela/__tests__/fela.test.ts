import { dumpAtomized, getRenderer } from "reactxx-fela";
import { initPlatform } from 'reactxx-tests'

test("fela", () => {
  initPlatform(true)
  const classNames = getRenderer().renderRuleEx(
    {
      color: "red",
      margin: 10,
      ":hover": {
        margin: 5,
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
  ".a": "color:red /* root */",
  ".b": "margin:10px /* root */",
  ".c:hover": "margin:5px /* root */",
  "@media (min-width: 768px).d:hover:active": "width:700px /* root */",
}
`);
});
