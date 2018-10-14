import { TAtomize } from "reactxx-typings";
// ******* WEB imports
import { platform } from "../../index";

const web$applyLastwinsStrategy = (concated: TAtomize.AtomicWebsLow) => {
  const merged = platform.applyLastwinsStrategy(concated);
  const dump = platform.dumpAtomized(merged);
  dump[" source"] = concated
    .map(
      (c: TAtomize.__dev_AtomicWeb) =>
        typeof c === "string" ? c : c.className
    )
    .join(" ");
  dump[" result"] = (merged as TAtomize.AtomicWebsLow)
    .map(
      (c: TAtomize.__dev_AtomicWeb) =>
        typeof c === "string" ? c : c.className
    )
    .join(" ");
  return dump;
};

export const WEB = {
  defineRulesets: ({ ruleset1, ruleset2 }) => {
    const defineRuleset = (data: {}, tracePath: string) =>
      platform.toPlatformAtomizeRuleset(data, tracePath) as TAtomize.AtomicWebs;
    const rs1 = defineRuleset(ruleset1, 'ruleset1')
    const rs2 = defineRuleset(ruleset2, 'ruleset2')
    const res = {
      ruleset1: platform.dumpAtomized(rs1),
      ruleset2: platform.dumpAtomized(rs2),
      ruleset1Wins: web$applyLastwinsStrategy(rs2.concat(rs1)),
      ruleset2Wins: web$applyLastwinsStrategy(rs1.concat(rs2))
    };
    return res
  }
}

const native$applyLastwinsStrategy = (concated: TAtomize.AtomicWebsLow) => {
  const merged = platform.applyLastwinsStrategy(concated as TAtomize.AtomicWebs);
  const dump = platform.dumpAtomized(merged);
  return dump;
};

export const NATIVE = {
  defineRulesets: ({ ruleset1, ruleset2 }) => {
    const defineRuleset = (data: {}, tracePath: string) =>
      platform.toPlatformAtomizeRuleset(data, tracePath) as TAtomize.AtomicWebs;
    const rs1 = defineRuleset(ruleset1, 'ruleset1')
    const rs2 = defineRuleset(ruleset2, 'ruleset2')
    return {
      ruleset1: platform.dumpAtomized(rs1),
      ruleset2: platform.dumpAtomized(rs2),
      ruleset1Wins: native$applyLastwinsStrategy(rs2.concat(rs1)),
      ruleset2Wins: native$applyLastwinsStrategy(rs1.concat(rs2))
    };
  }
}
