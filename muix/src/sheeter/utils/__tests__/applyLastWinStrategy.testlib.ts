import { TAtomize } from "reactxx-typings";
import { platform } from "reactxx-sheeter";

const web$dumpEx = (concated: TAtomize.AtomicWebsLow, merged: TAtomize.AtomicArrayLow) => {
  const dump = []
  //const dump = platform.dumpAtomized(merged)
  dump.push('SOURCE=' + concated
    .map((c: TAtomize.__dev_AtomicWeb) => typeof c === "string" ? c : c.cache.className)
    .join(" "));
  dump.push('RESULT=' + (merged as TAtomize.AtomicWebsLow)
    .map((c: TAtomize.__dev_AtomicWeb) => typeof c === "string" ? c : c.cache.className)
    .join(" "))
  dump.push('')
  return dump.join('\n') + platform.dumpAtomized(merged);
};

export const WEB = {
  defineRulesets: ({ ruleset1, ruleset2 }) => {
    const rs1 = [platform.toPlatformAtomizeRuleset(ruleset1, 'ruleset1')]
    const rs2 = [platform.toPlatformAtomizeRuleset(ruleset2, 'ruleset2')]
    const concat1 = rs2.concat(rs1)
    const concat2 = rs1.concat(rs2)
    const rsWin1 = platform.applyLastwinsStrategy(concat1)
    const rsWin2 = platform.applyLastwinsStrategy(concat2)
    const res = {
      ruleset1: platform.dumpAtomized(rs1),
      ruleset2: platform.dumpAtomized(rs2),
      ruleset1Wins: web$dumpEx(concat1 as TAtomize.AtomicWebsLow, rsWin1),
      ruleset2Wins: web$dumpEx(concat2 as TAtomize.AtomicWebsLow, rsWin2),
      final1: platform.finalizeClassName(rsWin1),
      final2: platform.finalizeClassName(rsWin2),
    };
    return res
  }
}

const native$dumpEx = (concated: TAtomize.Variants, merged: TAtomize.AtomicArrayLow) =>
  platform.dumpAtomized(merged);

export const NATIVE = {
  defineRulesets: ({ ruleset1, ruleset2 }) => {
    const rs1 = [platform.toPlatformAtomizeRuleset(ruleset1, 'ruleset1')]
    const rs2 = [platform.toPlatformAtomizeRuleset(ruleset2, 'ruleset2')]
    const concat1 = rs2.concat(rs1)
    const concat2 = rs1.concat(rs2)
    const rsWin1 = platform.applyLastwinsStrategy(concat1)
    const rsWin2 = platform.applyLastwinsStrategy(concat2)
    const res = {
      ruleset1: platform.dumpAtomized(rs1),
      ruleset2: platform.dumpAtomized(rs2),
      ruleset1Wins: native$dumpEx(concat1, rsWin1),
      ruleset2Wins: native$dumpEx(concat2, rsWin2),
      final1: platform.finalizeClassName(rsWin1),
      final2: platform.finalizeClassName(rsWin2),
    };
    return res
  }
}
