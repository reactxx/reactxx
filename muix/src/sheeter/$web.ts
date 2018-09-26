import { renderer } from 'reactxx-fela'
import { TAtomize } from 'reactxx-typings'

export const toAtomicArray: TAtomize.ToAtomicClassesProc = renderer.renderRuleEx

export const getTracePath: TAtomize.TraceAtomicClassProc = (value: TAtomize.AtomicWeb) => renderer.trace[value]
