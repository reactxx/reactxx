import { TAtomize } from "reactxx-typings";
import { platform } from "reactxx-sheeter";

const web$applyLastwinsStrategy = (concated: TAtomize.AtomicWebsLow, merged: TAtomize.AtomicArrayLow) => {
  const dump = platform.dumpAtomized(merged) as string[];
  dump.push('SOURCE=' + concated
    .map((c: TAtomize.__dev_AtomicWeb) => typeof c === "string" ? c : c.cache.className)
    .join(" "));
  dump.push('RESULT=' + (merged as TAtomize.AtomicWebsLow)
    .map((c: TAtomize.__dev_AtomicWeb) => typeof c === "string" ? c : c.cache.className)
    .join(" "))
  return dump;
};

export const WEB = {
  defineRulesets: ({ ruleset1, ruleset2 }) => {
    const rs1 = platform.toPlatformAtomizeRuleset(ruleset1, 'ruleset1')
    const rs2 = platform.toPlatformAtomizeRuleset(ruleset2, 'ruleset2')
    const concat1 = rs2.concat(rs1)
    const concat2 = rs1.concat(rs2)
    const rsWin1 = platform.applyLastwinsStrategy(concat1)
    const rsWin2 = platform.applyLastwinsStrategy(concat2)
    const res = {
      ruleset1: platform.dumpAtomized(rs1),
      ruleset2: platform.dumpAtomized(rs2),
      ruleset1Wins: web$applyLastwinsStrategy(concat1, rsWin1),
      ruleset2Wins: web$applyLastwinsStrategy(concat2, rsWin2),
      final1: platform.finalClassNameStep(rsWin1),
      final2: platform.finalClassNameStep(rsWin2),
    };
    return res
  }
}

const native$applyLastwinsStrategy = (concated: TAtomize.Atomic[], merged: TAtomize.AtomicArrayLow) =>
  platform.dumpAtomized(merged);

export const NATIVE = {
  defineRulesets: ({ ruleset1, ruleset2 }) => {
    const rs1 = platform.toPlatformAtomizeRuleset(ruleset1, 'ruleset1')
    const rs2 = platform.toPlatformAtomizeRuleset(ruleset2, 'ruleset2')
    const concat1 = rs2.concat(rs1)
    const concat2 = rs1.concat(rs2)
    const rsWin1 = platform.applyLastwinsStrategy(concat1)
    const rsWin2 = platform.applyLastwinsStrategy(concat2)
    const res = {
      ruleset1: platform.dumpAtomized(rs1),
      ruleset2: platform.dumpAtomized(rs2),
      ruleset1Wins: native$applyLastwinsStrategy(concat1, rsWin1),
      ruleset2Wins: native$applyLastwinsStrategy(concat2, rsWin2),
      final1: platform.finalClassNameStep(rsWin1),
      final2: platform.finalClassNameStep(rsWin2),
    };
    return res
  }
}
