/** @jsx createElement */

import { createElement, atomizeRuleset, toClassNamesWithQuery } from 'reactxx-sheeter'

const x = atomizeRuleset({color: 'red'}, null, null)
const y = toClassNamesWithQuery(null, [x])

const Comp: React.SFC = props => <div classNameX={y}/>

export default Comp
