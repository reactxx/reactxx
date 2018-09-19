import { renderer } from 'reactxx-fela'
import { TCompiler } from '../d-index'

export const toAtomicClasses: TCompiler.ToAtomicClassesProc = renderer.renderRuleEx

export const getTracePath: TCompiler.TraceAtomicClassProc = (value: TCompiler.AtomicWeb) => renderer.trace[value]
