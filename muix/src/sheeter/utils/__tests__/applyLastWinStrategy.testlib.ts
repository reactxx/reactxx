import { TAtomize } from "reactxx-typings";
// ******* WEB imports
import {
  dumpAtomized as dumpAtomizedWeb,
  applyLastwinsStrategy as applyLastwinsStrategyWeb,
  toPlatformAtomizeRuleset as toPlatformAtomizeRulesetWeb
} from "../../index";
import { resetRenderer } from "reactxx-fela";

// ******* NATIVE imports
import {
  applyLastwinsStrategy as applyLastwinsStrategyNative,
  dumpAtomized as dumpAtomizedNative,
  toPlatformAtomizeRuleset as toPlatformAtomizeRulesetNative
} from "../../index-native";


const web$applyLastwinsStrategy = (concated: TAtomize.AtomicWebsLow) => {
  const merged = applyLastwinsStrategyWeb(concated as TAtomize.AtomicWebs);
  const dump = dumpAtomizedWeb(merged);
  dump[" source"] = concated
    .map(
      (c: TAtomize.__dev_AtomicWeb) =>
        typeof c === "string" ? c : c.className
    )
    .join(" ");
  dump[" result"] = merged
    .map(
      (c: TAtomize.__dev_AtomicWeb) =>
        typeof c === "string" ? c : c.className
    )
    .join(" ");
  return dump;
};

export const WEB = {
  defineRulesets: ({ruleset1, ruleset2}) => {
    resetRenderer();
    const defineRuleset = (data: {}, tracePath: string) =>
      toPlatformAtomizeRulesetWeb(data, tracePath) as TAtomize.AtomicWebs;
    const rs1 = defineRuleset(ruleset1, 'ruleset1')  
    const rs2 = defineRuleset(ruleset2, 'ruleset2')
    const res = {
      ruleset1: dumpAtomizedWeb(rs1),
      ruleset2: dumpAtomizedWeb(rs2),
      ruleset1Wins: web$applyLastwinsStrategy(rs2.concat(rs1)),
      ruleset2Wins: web$applyLastwinsStrategy(rs1.concat(rs2))
    };
    return res
  }
}

const native$applyLastwinsStrategy = (concated: TAtomize.AtomicWebsLow) => {
  const merged = applyLastwinsStrategyNative(concated as TAtomize.AtomicWebs);
  const dump = dumpAtomizedNative(merged);
  return dump;
};

export const NATIVE = {
  defineRulesets: ({ruleset1, ruleset2}) => {
    const defineRuleset = (data: {}, tracePath: string) =>
      toPlatformAtomizeRulesetNative(data, tracePath) as TAtomize.AtomicWebs;
    const rs1 = defineRuleset(ruleset1, 'ruleset1')  
    const rs2 = defineRuleset(ruleset2, 'ruleset2')
    return {
      ruleset1: dumpAtomizedNative(rs1),
      ruleset2: dumpAtomizedNative(rs2),
      ruleset1Wins: native$applyLastwinsStrategy(rs2.concat(rs1)),
      ruleset2Wins: native$applyLastwinsStrategy(rs1.concat(rs2))
    };
  }
}
