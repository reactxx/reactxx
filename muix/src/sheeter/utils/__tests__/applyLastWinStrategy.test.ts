import { TAtomize } from "reactxx-typings";
// WEB imports
import { rendererCreate } from "reactxx-fela";
import { applyLastWinStrategyCreator } from "../../index";
import { dumpAtomized as dumpAtomizedWeb } from "../../$web";

// NATIVE imports
import { applyLastWinStrategy as applyLastWinStrategyNative } from "../../index-native";
import {
  dumpAtomized as dumpAtomizedNative,
  toPlatformAtomizeRuleset as toPlatformAtomizeRulesetNative
} from "../../$native";

test("applyLastWinStrategy WEB", () => {
  window.isWeb = true;
  const renderer = rendererCreate();
  const applyLastWinStrategyWeb = applyLastWinStrategyCreator(renderer);
  const toPlatformAtomizeRulesetWeb = renderer.renderRuleEx;
  /****************
   * RULESET 1
   ***************/
  const ruleset1 = toPlatformAtomizeRulesetWeb(
    {
      color: "red",
      margin: 10,
      padding: 10,
      right: 20,
      ":hover": {
        margin: 5,
        ":active": {
          color: "green"
        }
      }
    },
    "ruleset1"
  ) as string[];
  expect(dumpAtomizedWeb(renderer, ruleset1)).toMatchInlineSnapshot(`
Object {
  ":hover :active f": "{color: green} /* path=ruleset1, propId=:hover :activecolor */",
  ":hover e": "{margin: 5px} /* path=ruleset1, propId=:hovermargin */",
  "a": "{color: red} /* path=ruleset1, propId=color */",
  "b": "{margin: 10px} /* path=ruleset1, propId=margin */",
  "c": "{padding: 10px} /* path=ruleset1, propId=padding */",
  "d": "{right: 20px} /* path=ruleset1, propId=right */",
}
`);
  /****************
   * RULESET 2
   */
  const ruleset2 = toPlatformAtomizeRulesetWeb(
    {
      color: "black",
      margin: 15,
      left: 10,
      right: 20,
      ":hover": {
        margin: 10,
        ":active": {
          color: "blue"
        }
      }
    },
    "ruleset2"
  ) as string[];
  expect(dumpAtomizedWeb(renderer, ruleset2)).toMatchInlineSnapshot(`
Object {
  ":hover :active k": "{color: blue} /* path=ruleset2, propId=:hover :activecolor */",
  ":hover j": "{margin: 10px} /* path=ruleset2, propId=:hovermargin */",
  "d": "{right: 20px} /* path=ruleset1, propId=right */",
  "g": "{color: black} /* path=ruleset2, propId=color */",
  "h": "{margin: 15px} /* path=ruleset2, propId=margin */",
  "i": "{left: 10px} /* path=ruleset2, propId=left */",
}
`);
  /****************
   * CONCAT RULESET2 WITH RULESET1 => RULESET1 WINS
   */
  const concated1 = ruleset2.concat(ruleset1);
  const merged_1wins = applyLastWinStrategyWeb(
    concated1 as TAtomize.AtomicArray
  );
  const dump1 = dumpAtomizedWeb(renderer, merged_1wins);
  dump1[" source"] = concated1.join(" ");
  dump1[" result"] = merged_1wins.join(" ");
  expect(dump1).toMatchInlineSnapshot(`
Object {
  " result": "f e d c b a i",
  " source": "g h i d j k a b c d e f",
  ":hover :active f": "{color: green} /* path=ruleset1, propId=:hover :activecolor */",
  ":hover e": "{margin: 5px} /* path=ruleset1, propId=:hovermargin */",
  "a": "{color: red} /* path=ruleset1, propId=color */",
  "b": "{margin: 10px} /* path=ruleset1, propId=margin */",
  "c": "{padding: 10px} /* path=ruleset1, propId=padding */",
  "d": "{right: 20px} /* path=ruleset1, propId=right */",
  "i": "{left: 10px} /* path=ruleset2, propId=left */",
}
`);
  /****************
   * CONCAT RULESET1 WITH RULESET2 => RULESET2 WINS
   */

  const concated2 = ruleset1.concat(ruleset2);
  const merged_2wins = applyLastWinStrategyWeb(
    concated2 as TAtomize.AtomicArray
  );
  const dump2 = dumpAtomizedWeb(renderer, merged_2wins);
  dump2[" source"] = concated2.join(" ");
  dump2[" result"] = merged_2wins.join(" ");
  expect(dump2).toMatchInlineSnapshot(`
Object {
  " result": "k j d i h g c",
  " source": "a b c d e f g h i d j k",
  ":hover :active k": "{color: blue} /* path=ruleset2, propId=:hover :activecolor */",
  ":hover j": "{margin: 10px} /* path=ruleset2, propId=:hovermargin */",
  "c": "{padding: 10px} /* path=ruleset1, propId=padding */",
  "d": "{right: 20px} /* path=ruleset1, propId=right */",
  "g": "{color: black} /* path=ruleset2, propId=color */",
  "h": "{margin: 15px} /* path=ruleset2, propId=margin */",
  "i": "{left: 10px} /* path=ruleset2, propId=left */",
}
`);
});

test("applyLastWinStrategy NATIVE", () => {
  window.isWeb = false;
  /****************
   * RULESET 1
   ***************/
  const ruleset1 = toPlatformAtomizeRulesetNative(
    {
      color: "red",
      margin: 10,
      right: 20,
      padding: 10
    },
    "ruleset1"
  ) as TAtomize.AtomicNatives;
  expect(dumpAtomizedNative(ruleset1)).toMatchInlineSnapshot(`
Array [
  Object {
    "propId": "color",
    "tracePath": "ruleset1",
    "value": "red",
  },
  Object {
    "propId": "margin",
    "tracePath": "ruleset1",
    "value": 10,
  },
  Object {
    "propId": "right",
    "tracePath": "ruleset1",
    "value": 20,
  },
  Object {
    "propId": "padding",
    "tracePath": "ruleset1",
    "value": 10,
  },
]
`);

  /****************
   * RULESET 2
   */
  const ruleset2 = toPlatformAtomizeRulesetNative(
    {
      color: "black",
      margin: 15,
      right: 20,
      left: 10
    },
    "ruleset2"
  ) as TAtomize.AtomicNatives;
  expect(dumpAtomizedNative(ruleset2)).toMatchInlineSnapshot(`
Array [
  Object {
    "propId": "color",
    "tracePath": "ruleset2",
    "value": "black",
  },
  Object {
    "propId": "margin",
    "tracePath": "ruleset2",
    "value": 15,
  },
  Object {
    "propId": "right",
    "tracePath": "ruleset2",
    "value": 20,
  },
  Object {
    "propId": "left",
    "tracePath": "ruleset2",
    "value": 10,
  },
]
`);

  /****************
   * CONCAT RULESET2 WITH RULESET1 => RULESET1 WINS
   */
  const concated1 = ruleset2.concat(ruleset1);
  const merged_1wins = applyLastWinStrategyNative(
    concated1 as TAtomize.AtomicArray
  );
  const dump1 = dumpAtomizedNative(merged_1wins);
  expect(dump1).toMatchInlineSnapshot(`
Object {
  "color": "red",
  "left": 10,
  "margin": 10,
  "padding": 10,
  "right": 20,
}
`);
  /****************
   * CONCAT RULESET1 WITH RULESET2 => RULESET2 WINS
   */

  const concated2 = ruleset1.concat(ruleset2);
  const merged_2wins = applyLastWinStrategyNative(
    concated2 as TAtomize.AtomicArray
  );
  const dump2 = dumpAtomizedNative(merged_2wins);
  expect(dump2).toMatchInlineSnapshot(`
Object {
  "color": "black",
  "left": 10,
  "margin": 15,
  "padding": 10,
  "right": 20,
}
`);
});
